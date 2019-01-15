import { currencies } from './../../../../shared/_helpers/product_details';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { processedPackageUnits } from '@app/shared/_helpers/processed';
import { Product } from '@app/core/models/order/product';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-invoice-agricultural-product',
  templateUrl: './invoice-agricultural-product.component.html',
  styleUrls: ['./invoice-agricultural-product.component.scss']
})
export class InvoiceAgriculturalProductComponent implements OnInit {
  units = processedPackageUnits;
  currencies = currencies;
  product: any;
  productForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<InvoiceAgriculturalProductComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      variety: ['', Validators.required],
      weight_unit: ['', Validators.required],
      total_amount: ['', Validators.required],
      type_of_package: ['', [Validators.required]],
      number_of_packages: ['', [Validators.required]],
      package_weight: ['', [Validators.required]],
      price_per_unit: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      price_per_package: ['', [Validators.required]],
      total_price: ['', [Validators.required]],
      to_inventory: ['true', [Validators.required]]
    });
  }

  onExit(): void {
    this.dialogRef.close();
  }

  get productf() {
    return this.productForm.controls;
  }

  addProduct() {
    this.product = {
      product_type: 'agricultural',
      produce: this.productf.name.value,
      variety: this.productf.variety.value,
      type_of_package: this.productf.type_of_package.value,
      quantity: this.productf.number_of_packages.value,
      package_weight: this.productf.package_weight.value,
      weight_unit: this.productf.weight_unit.value,
      total_weight: this.productf.total_amount.value,
      price_per_unit: this.productf.price_per_unit.value,
      package_price: this.productf.price_per_package.value,
      product_subtotal: this.productf.total_price.value,
      to_inventory: this.productf.to_inventory.value,
      currency: this.productf.currency.value,
      out_of_inventory: true,
      weight_details: true,
      price_details: true,
      has_package_details: true
    };
    this.dialogRef.close(this.product);
  }
}
