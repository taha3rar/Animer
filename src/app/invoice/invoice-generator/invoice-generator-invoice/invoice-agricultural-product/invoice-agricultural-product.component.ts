import { currencies } from './../../../../shared/_helpers/product_details';
import { Component, OnInit, Inject } from '@angular/core';
import { processedPackageUnits } from '@app/shared/_helpers/processed';
import { ProductInvoice } from '@app/core/models/invoice/product-invoice';
import { ProductSetupInvoice } from '@app/core/models/invoice/productSetup-invoice';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-invoice-agricultural-product',
  templateUrl: './invoice-agricultural-product.component.html',
  styleUrls: ['./invoice-agricultural-product.component.scss']
})
export class InvoiceAgriculturalProductComponent implements OnInit {
  units = processedPackageUnits;
  currencies = currencies;
  product: ProductInvoice;
  update: boolean;
  oldSubtotal: number;
  currency: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductSetupInvoice,
    public dialogRef: MatDialogRef<InvoiceAgriculturalProductComponent>
  ) {}

  ngOnInit() {
    this.update = false;
    if (this.data.currency) {
      this.currency = this.data.currency;
    }
    if (Number(this.data.index) >= 0) {
      this.product = JSON.parse(JSON.stringify(this.data.productList[this.data.index]));
      this.oldSubtotal = this.product.product_subtotal;
      this.update = true;
    } else {
      this.product = new ProductInvoice();
    }
  }

  onExit(): void {
    this.dialogRef.close();
  }

  setAverageAmountPerPackage() {
    if (this.product.total_weight && this.product.quantity) {
      this.product.package_weight = Number((this.product.total_weight / this.product.quantity).toFixed(2));
    } else {
      this.product.package_weight = undefined;
    }
  }

  setPriceUnit() {
    if (this.product.total_weight && this.product.price_per_unit) {
      this.product.product_subtotal = Number((this.product.price_per_unit * this.product.total_weight).toFixed(2));
      if (this.product.quantity) {
        this.product.package_price = Number((this.product.product_subtotal / this.product.quantity).toFixed(2));
      } else {
        this.product.package_price = undefined;
      }
    } else {
      this.product.product_subtotal = undefined;
    }
  }

  setPricePackage() {
    if (this.product.quantity && this.product.package_price) {
      this.product.product_subtotal = Number((this.product.quantity * this.product.package_price).toFixed(2));
      if (this.product.total_weight) {
        this.product.price_per_unit = Number((this.product.product_subtotal / this.product.total_weight).toFixed(2));
      } else {
        this.product.price_per_unit = undefined;
      }
    } else {
      this.product.product_subtotal = undefined;
    }
  }

  addProduct(): void {
    this.dialogRef.close({
      event: 'submit',
      product: this.product,
      currency: this.currency
    });
  }

  updateProduct(): void {
    this.data.productList[this.data.index] = this.product;
    this.dialogRef.close({
      event: 'update',
      index: this.data.index,
      oldSubtotal: this.oldSubtotal,
      product: this.product
    });
  }
}
