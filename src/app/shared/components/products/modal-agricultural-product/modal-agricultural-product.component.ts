import { Component, Inject, OnInit } from '@angular/core';
import { ProductSetupInvoice } from '@app/core/models/invoice/productSetup-invoice';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BaseProductOrder } from '../../../../order/order-generator/order-product-list/base-product-order';

@Component({
  selector: 'app-modal-agricultural-product',
  templateUrl: './modal-agricultural-product.component.html',
  styleUrls: ['./modal-agricultural-product.component.scss']
})
export class ModalAgriculturalProductComponent extends BaseProductOrder {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductSetupInvoice,
    public dialogRef: MatDialogRef<ModalAgriculturalProductComponent>
  ) {
    super(dialogRef, data, 'agricultural');
  }

  setPackageAmount() {
    if (this.product.total_weight && this.product.package_weight) {
      this.product.quantity = Math.ceil(Number(this.product.total_weight / this.product.package_weight));
    } else {
      this.product.quantity = undefined;
      this.product.package_price = undefined;
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
