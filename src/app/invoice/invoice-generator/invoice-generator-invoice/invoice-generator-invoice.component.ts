import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '@app/core/models/invoice/invoice';
import { FormGroup } from '@angular/forms';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { Product } from '@app/core/models/product';
import { InvoiceInventoryComponent } from './invoice-inventory/invoice-inventory.component';
import { InvoiceAgriculturalProductComponent } from './invoice-agricultural-product/invoice-agricultural-product.component';
import { InvoiceProcessedProductComponent } from './invoice-processed-product/invoice-processed-product.component';

@Component({
  selector: 'app-invoice-generator-invoice',
  templateUrl: './invoice-generator-invoice.component.html',
  styleUrls: ['./invoice-generator-invoice.component.scss']
})
export class InvoiceGeneratorInvoiceComponent implements OnInit {
  productList: any[] = [];
  @Input()
  form: FormGroup;

  constructor(private dialog: MatDialog, private route: ActivatedRoute) {}

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
      console.log(this.productList);
    });
  }

  openDialogAgricultural(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.height = '770px';
    dialogConfig.width = '850px';

    const dialogRef = this.dialog.open(InvoiceAgriculturalProductComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(newProduct => {
      if (newProduct) {
        this.updateTotalDue(newProduct.product_subtotal);
        this.productList.push(newProduct);
      }
      console.log(this.productList);
    });
  }

  openDialogProcessed(): void {
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
      console.log(this.productList);
    });
  }

  save() {
    console.log(this.form);
  }

  display() {
    console.log(this.productList);
  }
}
