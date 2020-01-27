import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BaseProductOrder } from '@app/order/order-generator/order-product-list/base-product-order';
import { ProductSetupInvoice } from '@app/core/models/invoice/productSetup-invoice';
import { inputProductTypes } from '@app/shared/helpers/input_product_types';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-product',
  templateUrl: './input-product.component.html',
  styleUrls: ['./input-product.component.scss']
})
export class InputProductComponent extends BaseProductOrder {
  input_product_types = inputProductTypes;
  @ViewChild('modalForm') form: any;
  isItemVisible = false;
  isItemDescriptionVisible = false;
  otherTypeSelected = false;

  itemFields = [
    { field: 'weight_unit', for: 'consumable' },
    { field: 'item_measurement_amount', for: 'consumable' },
    { field: 'item_description', for: 'capital' }
  ];

  constructor(
    public dialogRef: MatDialogRef<InputProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductSetupInvoice
  ) {
    super(dialogRef, data, 'input');
  }

  setPriceUnit() {
    if (this.product.quantity && this.product.price_per_unit) {
      this.product.product_subtotal = Number((this.product.price_per_unit * this.product.quantity).toFixed(2));
    } else {
      this.product.product_subtotal = undefined;
      this.product.package_price = undefined;
    }
  }

  checkInputType(obj_value: any) {
    this.otherTypeSelected = false;
    this.isItemVisible = false;
    this.isItemDescriptionVisible = false;
    this.input_product_types.forEach(item => {
      if (item.value === obj_value) {
        item.type === 'consumable' ? (this.isItemVisible = true) : (this.isItemDescriptionVisible = true);
      }
    });
    if (obj_value === 'Other') {
      this.otherTypeSelected = true;
    }
    this.clearInput();
  }

  clearInput() {
    if (this.form.controls['weight_unit']) {
      this.form.controls['weight_unit'].setValue(undefined);
    }
    if (this.form.controls['other_input_type']) {
      this.form.controls['other_input_type'].setValue(undefined);
    }
    if (this.form.controls['item_measurement_amount']) {
      this.form.controls['item_measurement_amount'].setValue(undefined);
    }
  }

  onSubmit() {
    Object.keys(this.form.form.controls).forEach(field => {
      const control = this.form.form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }
}
