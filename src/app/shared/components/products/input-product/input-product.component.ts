import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BaseProductOrder } from '@app/order/order-generator/order-product-list/base-product-order';
import { ProductSetupInvoice } from '@app/core/models/invoice/productSetup-invoice';

@Component({
  selector: 'app-input-product',
  templateUrl: './input-product.component.html',
  styleUrls: ['./input-product.component.scss']
})
export class InputProductComponent extends BaseProductOrder implements OnInit {
  product_types = [
    'Seeds',
    'Fertilizer',
    'Soil',
    'Insecticide',
    'Pesticide',
    'Animal Feed',
    'Insect Trap',
    'Irrigation',
    'Machinery'
  ];

  constructor(
    public dialogRef: MatDialogRef<InputProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductSetupInvoice
  ) {
    super(dialogRef, data, 'processed');
  }

  ngOnInit() {}

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
        this.product.package_price = Number((this.product.price_per_unit * this.product.package_weight).toFixed(2));
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
      this.product.package_price = Number((this.product.price_per_unit * this.product.package_weight).toFixed(2));
    } else {
      this.product.package_price = undefined;
    }
  }
}
