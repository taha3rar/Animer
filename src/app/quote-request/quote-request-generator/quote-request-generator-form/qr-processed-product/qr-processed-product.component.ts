import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { measureUnits } from '@app/shared/helpers/measure';
import { currencies } from '@app/shared/helpers/currencies';

@Component({
  selector: 'app-qr-processed-product',
  templateUrl: './qr-processed-product.component.html',
  styleUrls: ['./qr-processed-product.component.scss']
})
export class QrProcessedProductComponent implements OnInit {
  productForm: FormGroup;
  currencies = currencies;
  units = measureUnits;
  onUpdate: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<QrProcessedProductComponent>
  ) {}

  ngOnInit() {
    this.onUpdate = false;
    const product = this.data.product;
    if (this.data.product) {
      this.onUpdate = true;
    }
    this.productForm = this.formBuilder.group({
      product_type: ['processed', Validators.required],
      produce: [product ? product.produce : undefined, Validators.required],
      type_of_package: [product ? product.type_of_package : undefined, Validators.required],
      items_per_package: [product ? product.items_per_package : undefined, Validators.required],
      quantity: [product ? product.quantity : undefined, Validators.required],
      total_amount_items: [product ? product.total_amount_items : 0],
      item_package_details: [product ? product.item_package_details : true, Validators.required],
      item_package_type: [product ? product.item_package_type : undefined, Validators.required],
      item_measurement_unit: [product ? product.item_measurement_unit : undefined, Validators.required],
      item_measurement_amount: [product ? product.item_measurement_amount : undefined, Validators.required]
    });
  }

  onExit() {
    this.dialog.close();
  }
}
