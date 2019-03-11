import { Component, OnInit, Inject } from '@angular/core';
import { ProductSetupInvoice } from '@app/core/models/invoice/productSetup-invoice';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BaseProductOrder } from '../base-product-order';

@Component({
  selector: 'app-order-agricultural-product',
  templateUrl: './order-agricultural-product.component.html',
  styleUrls: ['./order-agricultural-product.component.scss']
})
export class OrderAgriculturalProductComponent extends BaseProductOrder {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductSetupInvoice,
    public dialogRef: MatDialogRef<OrderAgriculturalProductComponent>
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
      this.product.package_price = undefined;
    }
  }

  setPricePackage() {
    if (this.product.quantity && this.product.product_subtotal) {
      this.product.package_price = Number((this.product.product_subtotal / this.product.quantity).toFixed(2));
    } else {
      this.product.package_price = undefined;
    }
  }
}
