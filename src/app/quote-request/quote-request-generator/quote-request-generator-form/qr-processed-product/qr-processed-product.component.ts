import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { measureUnits } from '@app/shared/helpers/measure';
import { BaseProductQuoteRequest } from '../../base-product-quote-request';

@Component({
  selector: 'app-qr-processed-product',
  templateUrl: './qr-processed-product.component.html',
  styleUrls: ['./qr-processed-product.component.scss']
})
export class QrProcessedProductComponent extends BaseProductQuoteRequest implements OnInit {
  productForm: FormGroup;
  units = measureUnits;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<QrProcessedProductComponent>,
    public formBuilder: FormBuilder
  ) {
    super(dialogRef, data.product, formBuilder, 'processed');
  }

  ngOnInit() {
    this.productForm = super.getProductForm();
    this.productForm.controls['variety'].disable();
    this.productForm.controls['package_weight'].disable();
    this.productForm.controls['weight_unit'].disable();
    this.productForm.controls['total_weight_requested'].disable();
    this.productForm.controls['input_produce_type'].disable();
    this.onChanges();
    this.formInput = this.productForm;
  }

  get product() {
    return this.productForm.controls;
  }

  onChanges(): void {
    this.productForm.get('items_per_package').valueChanges.subscribe(val => {
      this.setTotalItems();
    });
    this.productForm.get('quantity_requested').valueChanges.subscribe(val => {
      this.setTotalItems();
    });
  }

  setTotalItems(): void {
    if (this.product.quantity_requested.value && this.product.items_per_package.value) {
      this.productForm.patchValue({
        total_amount_items: this.product.items_per_package.value * this.product.quantity_requested.value
      });
    } else {
      this.productForm.patchValue({ package_weight: undefined });
    }
  }
}
