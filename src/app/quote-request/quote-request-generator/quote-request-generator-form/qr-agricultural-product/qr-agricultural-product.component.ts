import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { currencies } from '@app/shared/helpers/currencies';
import { measureUnits } from '@app/shared/helpers/measure';
import { BaseProductQuoteRequest } from '../../base-product-quote-request';
import { ProductQuoteRequest } from '@app/core/models/quote-request/product-quoteRequest';

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
    super(dialogRef, data, 'agricultural', formBuilder);
  }

  ngOnInit() {
    this.productForm = super.getProductForm();
    this.productForm.controls['item_package_type'].disable();
    this.productForm.controls['item_measurement_amount'].disable();
    this.productForm.controls['item_measurement_unit'].disable();
    this.productForm.controls['items_per_package'].disable();
    this.productForm.controls['total_amount_items'].disable();
    this.onChanges();
    this.formInput = this.productForm;
  }

  get product() {
    return this.productForm.controls;
  }

  onChanges(): void {
    this.productForm.get('package_weight').valueChanges.subscribe(val => {
      this.setPackageAmount();
    });
    this.productForm.get('total_weight').valueChanges.subscribe(val => {
      this.setPackageAmount();
    });
  }

  setPackageAmount(): void {
    if (this.product.package_weight.value && this.product.total_weight.value) {
      this.productForm.patchValue({
        quantity: Math.ceil(this.product.total_weight.value / this.product.package_weight.value)
      });
    } else {
      this.productForm.patchValue({ quantity: 0 });
    }
  }
}
