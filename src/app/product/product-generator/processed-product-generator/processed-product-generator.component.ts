import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { defaultValues } from '@app/shared/helpers/default_values';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { currencies } from '@app/shared/helpers/currencies';
import { packageUnits } from '@app/shared/helpers/packaging_details';
import { ProductService } from '@app/core';
import { Router } from '@angular/router';
import { Product } from '@app/core/models/product';

@Component({
  selector: 'app-processed-product-generator',
  templateUrl: './processed-product-generator.component.html',
  styleUrls: ['./processed-product-generator.component.scss']
})
export class ProcessedProductGeneratorComponent implements OnInit {
  newProduct: Product;
  productImage = defaultValues.processed_picture;
  productForm: FormGroup;
  currencies = currencies;
  units = packageUnits;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<ProcessedProductGeneratorComponent>,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      product_type: ['processed', Validators.required],
      produce: [undefined, Validators.required],
      sku: [undefined],
      type_of_package: [undefined, Validators.required],
      items_per_package: [undefined, Validators.required],
      quantity: [undefined, Validators.required],
      total_amount_items: [0],
      package_price: [undefined, Validators.required],
      total_price: [0, Validators.required],
      currency: [undefined, Validators.required],
      item_package_details: [true, Validators.required],
      item_package_type: [undefined, Validators.required],
      item_measurement_unit: [undefined, Validators.required],
      item_measurement_amount: [undefined, Validators.required]
    });
    this.onChanges();
  }
  onChanges(): void {
    this.productForm.get('quantity').valueChanges.subscribe(val => {
      this.setTotalItems();
      this.setPrice('package');
    });
    this.productForm.get('items_per_package').valueChanges.subscribe(val => {
      this.setTotalItems();
    });
    this.productForm.get('package_price').valueChanges.subscribe(val => {
      this.setPrice('package');
    });
  }

  setTotalItems(): void {
    if (this.product.quantity.value && this.product.items_per_package.value) {
      this.productForm.patchValue({
        total_amount_items: (this.product.items_per_package.value * this.product.quantity.value).toFixed(2)
      });
    } else {
      this.productForm.patchValue({ package_weight: 0 });
    }
  }

  setPrice(type: string): void {
    if (this.product.quantity.value && this.product.package_price.value) {
      this.productForm.patchValue({
        total_price: (this.product.quantity.value * this.product.package_price.value).toFixed(2)
      });
    } else {
      this.productForm.patchValue({ total_price: 0 });
    }
  }

  get product() {
    return this.productForm.controls;
  }

  onExit(): void {
    this.dialog.close();
  }

  receiveImage($event: any) {
    this.productImage = $event;
  }

  isFieldInvalid(field: string) {
    return this.productForm.get(field).invalid && this.productForm.get(field).touched;
  }

  showFieldStyle(field: string) {
    return {
      'has-error': this.isFieldInvalid(field)
    };
  }

  submit() {
    this.newProduct = this.productForm.value;
    this.newProduct.image = this.productImage;
    if (this.productForm.valid) {
      this.productService.create(this.newProduct).subscribe(() => {
        this.dialog.close();
        this.router.navigateByUrl('/product/list');
      });
    }
  }
}
