import { inputProductTypes } from '@app/shared/helpers/input_product_types';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { measureUnits } from '@app/shared/helpers/measure';
import { BaseProductQuoteRequest } from '../../base-product-quote-request';
import { currencies } from '@app/shared/helpers/currencies';

@Component({
  selector: 'app-qr-input-product',
  templateUrl: './qr-input-product.component.html',
  styleUrls: ['./qr-input-product.component.scss']
})
export class QrInputProductComponent extends BaseProductQuoteRequest implements OnInit {
  currencies = currencies;
  units = measureUnits;
  onUpdate: boolean;
  input_product_types = inputProductTypes;
  productForm: FormGroup;
  isItemVisible = false;
  isItemDescriptionVisible = false;
  otherTypeSelected = false;
  itemFields = [
    { field: 'weight_unit', for: 'consumable' },
    { field: 'item_measurement_amount', for: 'consumable' },
    { field: 'item_description', for: 'capital' }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<QrInputProductComponent>,
    public formBuilder: FormBuilder
  ) {
    super(dialogRef, data.product, formBuilder, 'input');
  }

  ngOnInit() {
    this.formInput = this.productForm;
    this.productForm.controls['items_per_package'].disable();
    this.productForm.controls['variety'].disable();
    this.productForm.controls['package_weight'].disable();
    this.productForm.controls['total_weight_requested'].disable();
    this.productForm.controls['type_of_package'].disable();
    this.productForm.controls['item_package_type'].disable();
    this.productForm.controls['item_measurement_unit'].disable();
    this.productForm.controls['total_amount_items'].disable();
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

  setPriceUnit() {
    if (this.productForm.controls['quantity'].value && this.productForm.controls['price_per_unit'].value) {
      this.productForm.controls['total_price'].setValue(
        Number(
          (this.productForm.controls['price_per_unit'].value * this.productForm.controls['quantity'].value).toFixed(2)
        )
      );
    } else {
      this.productForm.controls['total_price'].setValue(undefined);
    }
  }

  setRequiredFields(obj_type: string) {
    this.itemFields.forEach(item => {
      this.productForm.controls[item.field].setValidators([]);
      this.productForm.controls[item.field].updateValueAndValidity();
    });
    this.itemFields.forEach(item => {
      if (item.for === obj_type) {
        this.productForm.controls[item.field].setValidators([Validators.required]);
        this.productForm.controls[item.field].updateValueAndValidity();
      }
    });
  }
}
