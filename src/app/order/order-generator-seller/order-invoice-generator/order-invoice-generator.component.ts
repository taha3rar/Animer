import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Invoice } from '@app/core/models/invoice/invoice';
import { Router } from '@angular/router';
import { InvoiceService } from '@app/core/api/invoice.service';
import { ProductInvoice } from '@app/core/models/invoice/product-invoice';
// tslint:disable-next-line:max-line-length
import { OrderAgriculturalProductComponent } from '../../order-generator/order-product-list/order-agricultural-product/order-agricultural-product.component';
// tslint:disable-next-line:max-line-length
import { OrderProcessedProductComponent } from '../../order-generator/order-product-list/order-processed-product/order-processed-product.component';
import * as moment from 'moment';

import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-invoice-generator',
  templateUrl: './order-invoice-generator.component.html',
  styleUrls: ['./order-invoice-generator.component.scss']
})
export class OrderInvoiceGeneratorComponent implements OnInit {
  newInvoice: Invoice;
  @Input()
  form: FormGroup;
  @Input()
  products: ProductInvoice[];
  @Output()
  newInvoiceEvent = new EventEmitter<Invoice>();

  constructor(private invoiceService: InvoiceService, private dialog: MatDialog, private router: Router) {}

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

  get seller() {
    return this.form.controls.seller.value;
  }

  get buyer() {
    return this.form.controls.buyer.value;
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

  openDialogAgricultural(index?: number): void {
    const data = {
      productList: this.products,
      index: index,
      currency: this.invoice.currency.value
    };

    this.openDialog('770px', OrderAgriculturalProductComponent, data);
  }

  openDialogProcessed(index?: number): void {
    const data = {
      productList: this.products,
      index: index,
      currency: this.invoice.currency.value
    };

    this.openDialog('800px', OrderProcessedProductComponent, data);
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
    this.invoice['sign_by'].patchValue({ date: moment(this.form['controls'].sign_by['controls'].date.value).toJSON() });
    this.invoice['deliver_to'].patchValue({
      expected_delivery_date: moment(this.form['controls'].deliver_to['controls'].expected_delivery_date.value).toJSON()
    });
    this.newInvoice = this.form.value;
    this.newInvoice.products = this.products;
    this.newInvoice.draft = true;
    this.invoiceService.draft(this.newInvoice).subscribe(() => {
      this.router.navigateByUrl('/order/list');
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
