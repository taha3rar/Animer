import { Component, OnInit, Inject } from '@angular/core';
import { ProductSetupInvoice } from '@app/core/models/invoice/productSetup-invoice';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BaseProductInvoice } from '../../base-product-invoice';

@Component({
  selector: 'app-invoice-agricultural-product',
  templateUrl: './invoice-agricultural-product.component.html',
  styleUrls: ['./invoice-agricultural-product.component.scss']
})
export class InvoiceAgriculturalProductComponent extends BaseProductInvoice {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductSetupInvoice,
    public dialogRef: MatDialogRef<InvoiceAgriculturalProductComponent>
  ) {
    super(dialogRef, data, 'agricultural');
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
}
