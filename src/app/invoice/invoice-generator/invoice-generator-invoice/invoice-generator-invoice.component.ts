import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductInvoice } from '@app/core/models/invoice/product-invoice';
import { Invoice } from '@app/core/models/invoice/invoice';
import { FormGroup } from '@angular/forms';
import { InvoiceService } from '@app/core/api/invoice.service';
import { InvoiceInventoryComponent } from './invoice-inventory/invoice-inventory.component';
import { InvoiceAgriculturalProductComponent } from './invoice-agricultural-product/invoice-agricultural-product.component';
import { InvoiceProcessedProductComponent } from './invoice-processed-product/invoice-processed-product.component';
import * as moment from 'moment';

@Component({
  selector: 'app-invoice-generator-invoice',
  templateUrl: './invoice-generator-invoice.component.html',
  styleUrls: ['./invoice-generator-invoice.component.scss']
})
export class InvoiceGeneratorInvoiceComponent implements OnInit {
  products: ProductInvoice[] = [];
  newInvoice: Invoice;
  @Output()
  newInvoiceEvent = new EventEmitter<Invoice>();
  @Input()
  form: FormGroup;

  constructor(
    private invoiceService: InvoiceService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.onChanges();
  }

  onChanges(): void {
    this.form.get('vat_percentage').valueChanges.subscribe(val => {
      this.applyVat();
    });
    this.form.get('discount_percentage').valueChanges.subscribe(val => {
      this.applyDiscount();
    });
  }

  get invoice() {
    return this.form.controls;
  }

  get issuer() {
    return this.form.controls.seller.value;
  }

  get buyer() {
    return this.form.controls.buyer.value;
  }

  get date_created() {
    return this.form.controls.date_created.value;
  }

  updateTotalDue(newSubtotal: number): void {
    this.invoice['subtotal'].setValue(this.invoice.subtotal.value + newSubtotal);
    this.applyVat();
  }

  applyVat(): void {
    this.invoice['vat_amount'].setValue((this.invoice.vat_percentage.value / 100) * this.invoice.subtotal.value);
    this.applyDiscount();
  }

  applyDiscount(): void {
    this.invoice['discount_amount'].setValue(
      (this.invoice.discount_percentage.value / 100) * (this.invoice.vat_amount.value + this.invoice.subtotal.value)
    );
    this.invoice['total_due'].setValue(
      this.invoice.subtotal.value + this.invoice.vat_amount.value - this.invoice.discount_amount.value
    );
  }

  deleteProduct($event: number): void {
    const index = $event;
    this.updateTotalDue(-this.products[index].product_subtotal);
    this.products.splice(index, 1);
    if (this.products.length < 1) {
      this.invoice['currency'].setValue(undefined);
    }
  }

  updateProduct($event: number): void {
    const index = $event;
    if (this.products[index].product_type === 'processed') {
      this.openDialogProcessed(index);
    }
    if (this.products[index].product_type === 'agricultural') {
      this.openDialogAgricultural(index);
    }
  }

  openDialogInventory(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.height = '700px';
    dialogConfig.width = '850px';
    dialogConfig.data = {
      products: this.route.snapshot.data['products']
    };

    const dialogRef = this.dialog.open(InvoiceInventoryComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(newProducts => {
      if (newProducts) {
        newProducts.forEach((newProduct: any) => {
          if (!this.invoice.currency.value) {
            this.invoice['currency'].setValue(newProduct.currency);
          }
          this.updateTotalDue(newProduct.product_subtotal);
        });
        this.products = this.products.concat(newProducts);
      }
    });
  }

  openDialogAgricultural(index?: number): void {
    const data = {
      productList: this.products,
      index: index,
      currency: this.invoice.currency.value
    };

    this.openDialog('770px', InvoiceAgriculturalProductComponent, data);
  }

  openDialogProcessed(index?: number): void {
    const data = {
      productList: this.products,
      index: index,
      currency: this.invoice.currency.value
    };

    this.openDialog('800px', InvoiceProcessedProductComponent, data);
  }

  openDialog(height: string, component: any, dialogData: any): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.height = height;
    dialogConfig.width = '850px';
    dialogConfig.data = dialogData;

    const dialogRef = this.dialog.open(component, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data && data.event === 'submit') {
        if (!this.invoice.currency.value) {
          this.invoice['currency'].setValue(data.currency);
        }
        this.updateTotalDue(data.product.product_subtotal);
        this.products.push(data.product);
      }
      if (data && data.event === 'update') {
        this.updateTotalDue(-data.oldSubtotal);
        this.updateTotalDue(data.product.product_subtotal);
        this.products[data.index] = data.product;
      }
    });
  }

  draftInvoice() {
    this.invoice['deliver_to_expected_delivery_date'].setValue(
      moment(this.invoice.deliver_to_expected_delivery_date.value).toJSON()
    );
    this.invoice['valid_until'].setValue(moment(this.invoice.valid_until.value).toJSON());
    this.newInvoice = this.form.value;
    this.newInvoice.products = this.products;
    this.newInvoice.draft = true;
    this.invoiceService.draft(this.newInvoice).subscribe(() => {
      this.router.navigateByUrl('/invoice/list');
    });
  }

  toReview() {
    this.invoice['sign_by'].patchValue({ date: moment(this.form['controls'].sign_by['controls'].date.value).toJSON() });
    this.invoice['deliver_to'].patchValue({
      expected_delivery_date: moment(this.form['controls'].deliver_to['controls'].expected_delivery_date.value).toJSON()
    });
    this.newInvoice = this.form.value;
    this.newInvoice.products = this.products;
    this.newInvoiceEvent.emit(this.newInvoice);
  }
}
