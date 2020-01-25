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
        this.setRequiredFields(item.type);
      }
    });
    if (obj_value === 'Other') {
      this.otherTypeSelected = true;
    }
  }

  setRequiredFields(obj_type: string) {
    this.itemFields.forEach(item => {
      this.form.form.get(item.field).setValidators([]);
      this.form.form.get(item.field).updateValueAndValidity();
    });
    this.itemFields.forEach(item => {
      if (item.for === obj_type) {
        this.form.form.get(item.field).setValidators([Validators.required]);
        this.form.form.get(item.field).updateValueAndValidity();
      }
    });
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
