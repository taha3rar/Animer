import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { processedPackageUnits } from '@app/shared/_helpers/processed';
import { currencies } from '@app/shared/_helpers/product_details';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-invoice-processed-product',
  templateUrl: './invoice-processed-product.component.html',
  styleUrls: ['./invoice-processed-product.component.scss']
})
export class InvoiceProcessedProductComponent implements OnInit {
  units = processedPackageUnits;
  currencies = currencies;
  product: any;
  productForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<InvoiceProcessedProductComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      type_of_package: ['', Validators.required],
      number_of_packages: ['', Validators.required],
      items_per_package: ['', Validators.required],
      item_package_type: ['', Validators.required],
      total_amount_items: ['', Validators.required],
      item_measurement_unit: ['', Validators.required],
      item_measurement_amount: ['', Validators.required],
      price_per_package: ['', Validators.required],
      currency: ['', Validators.required],
      total_price: ['', Validators.required],
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
      product_type: 'processed',
      produce: this.productf.name.value,
      type_of_package: this.productf.type_of_package.value,
      quantity: this.productf.number_of_packages.value,
      package_price: this.productf.price_per_package.value,
      product_subtotal: this.productf.total_price.value,
      to_inventory: this.productf.to_inventory.value,
      currency: this.productf.currency.value,
      out_of_inventory: true,
      individual_details: true,
      price_details: true,
      has_package_details: true
    };
    this.dialogRef.close(this.product);
  }
}
