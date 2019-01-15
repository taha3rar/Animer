import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductInvoice } from '@app/core/models/invoice/product-invoice';
import { Invoice } from '@app/core/models/invoice/invoice';
import { FormGroup } from '@angular/forms';
import { InvoiceService } from '@app/core/api/invoice.service';
import { InvoiceInventoryComponent } from './invoice-inventory/invoice-inventory.component';
import { InvoiceAgriculturalProductComponent } from './invoice-agricultural-product/invoice-agricultural-product.component';
import { InvoiceProcessedProductComponent } from './invoice-processed-product/invoice-processed-product.component';

@Component({
  selector: 'app-invoice-generator-invoice',
  templateUrl: './invoice-generator-invoice.component.html',
  styleUrls: ['./invoice-generator-invoice.component.scss']
})
export class InvoiceGeneratorInvoiceComponent implements OnInit {
  productList: ProductInvoice[] = [];
  newInvoice: Invoice;
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
      this.invoice.subtotal.value + this.invoice.vat_amount.value + this.invoice.discount_amount.value
    );
  }

  deleteProduct(index: number): void {
    this.updateTotalDue(-this.productList[index].product_subtotal);
    this.productList.splice(index, 1);
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
          this.updateTotalDue(newProduct.product_subtotal);
        });
        this.productList = this.productList.concat(newProducts);
      }
    });
  }

  updateProduct(index: number): void {
    if (this.productList[index].product_type === 'processed') {
      this.openDialogProcessed(index);
    }
    if (this.productList[index].product_type === 'agricultural') {
      this.openDialogAgricultural(index);
    }
  }

  openDialogAgricultural(index?: number): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.height = '770px';
    dialogConfig.width = '850px';
    dialogConfig.data = {
      productList: this.productList,
      index: index
    };

    const dialogRef = this.dialog.open(InvoiceAgriculturalProductComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data && data.event === 'submit') {
        this.updateTotalDue(data.product.product_subtotal);
        this.productList.push(data.product);
      }
      if (data && data.event === 'update') {
        this.updateTotalDue(-data.oldSubtotal);
        this.updateTotalDue(data.product.product_subtotal);
        this.productList[data.index] = data.product;
      }
    });
  }

  openDialogProcessed(index?: number): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.height = '800px';
    dialogConfig.width = '850px';

    const dialogRef = this.dialog.open(InvoiceProcessedProductComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(newProduct => {
      if (newProduct) {
        this.updateTotalDue(newProduct.product_subtotal);
        this.productList.push(newProduct);
      }
    });
  }

  draftInvoice() {
    this.newInvoice = this.form.value;
    this.newInvoice.products = this.productList;
    console.log(this.newInvoice);
    this.invoiceService.draft(this.newInvoice).subscribe((invoice: Invoice) => {
      this.router.navigateByUrl('/invoices');
    });
  }

  save() {
    this.newInvoice = this.form.value;
    this.newInvoice.products = this.productList;
    console.log(this.newInvoice);
  }
}
