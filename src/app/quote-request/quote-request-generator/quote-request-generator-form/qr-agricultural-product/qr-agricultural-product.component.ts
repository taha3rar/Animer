import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { currencies } from '@app/shared/helpers/currencies';
import { measureUnits } from '@app/shared/helpers/measure';

@Component({
  selector: 'app-qr-agricultural-product',
  templateUrl: './qr-agricultural-product.component.html',
  styleUrls: ['./qr-agricultural-product.component.scss']
})
export class QrAgriculturalProductComponent implements OnInit {
  productForm: FormGroup;
  currencies = currencies;
  units = measureUnits;
  onUpdate: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<QrAgriculturalProductComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    const product = this.data.product;
    this.onUpdate = false;
    if (this.data.product) {
      this.onUpdate = true;
    }
    this.productForm = this.formBuilder.group({
      product_type: ['agricultural', Validators.required],
      produce: [product ? product.produce : undefined, Validators.required],
      type_of_package: [product ? product.type_of_package : undefined, Validators.required],
      quantity: [product ? product.quantity : 0, Validators.required],
      variety: [product ? product.variety : undefined, Validators.required],
      package_weight: [product ? product.package_weight : undefined, Validators.required],
      weight_unit: [product ? product.weight_unit : undefined, Validators.required],
      total_weight: [product ? product.total_weight : undefined, Validators.required]
    });
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

  onExit() {
    this.dialogRef.close();
  }
}
