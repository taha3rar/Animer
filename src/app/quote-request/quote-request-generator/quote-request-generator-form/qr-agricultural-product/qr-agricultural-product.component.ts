import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { currencies } from '@app/shared/helpers/currencies';
import { measureUnits } from '@app/shared/helpers/measure';
import { BaseProductQuoteRequest } from '../../base-product-quote-request';

@Component({
  selector: 'app-qr-agricultural-product',
  templateUrl: './qr-agricultural-product.component.html',
  styleUrls: ['./qr-agricultural-product.component.scss']
})
export class QrAgriculturalProductComponent extends BaseProductQuoteRequest implements OnInit {
  currencies = currencies;
  units = measureUnits;
  onUpdate: boolean;
  productForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<QrAgriculturalProductComponent>,
    public formBuilder: FormBuilder
  ) {
    super(dialogRef, data, formBuilder, 'agricultural');
  }

  ngOnInit() {
    this.productForm = super.getProductForm();
    this.productForm.controls['item_package_type'].disable();
    this.productForm.controls['item_measurement_amount'].disable();
    this.productForm.controls['item_measurement_unit'].disable();
    this.productForm.controls['items_per_package'].disable();
    this.productForm.controls['total_amount_items'].disable();
    this.formInput = this.productForm;
    this.onChanges();
  }

  get product() {
    return this.productForm.controls;
  }

  onChanges(): void {
    this.productForm.get('package_weight').valueChanges.subscribe(val => {
      this.setPackageAmount();
    });
    this.productForm.get('total_weight_requested').valueChanges.subscribe(val => {
      this.setPackageAmount();
    });
  }

  setPackageAmount(): void {
    if (this.product.package_weight.value && this.product.total_weight_requested.value) {
      this.productForm.patchValue({
        quantity_requested: Math.ceil(this.product.total_weight_requested.value / this.product.package_weight.value)
      });
    } else {
      this.productForm.patchValue({ quantity_requested: 0 });
    }
  }
}
