import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { defaultValues } from '@app/shared/helpers/default_values';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { currencies } from '@app/shared/helpers/currencies';
import { measureUnits } from '@app/shared/helpers/measure';
import { Product } from '@app/core/models/order/product';
import { ProductService } from '@app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agricultural-product-generator',
  templateUrl: './agricultural-product-generator.component.html',
  styleUrls: ['./agricultural-product-generator.component.scss']
})
export class AgriculturalProductGeneratorComponent implements OnInit {
  newProduct: Product;
  productImage = defaultValues.agri_picture;
  productForm: FormGroup;
  currencies = currencies;
  units = measureUnits;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<AgriculturalProductGeneratorComponent>,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      product_type: ['agricultural', Validators.required],
      produce: [undefined, Validators.required],
      sku: [undefined],
      type_of_package: [undefined, Validators.required],
      quantity: [undefined, Validators.required],
      package_price: [undefined, Validators.required],
      total_price: [0, Validators.required],
      currency: [undefined, Validators.required],
      variety: [undefined, Validators.required],
      package_weight: [0, Validators.required],
      weight_unit: [undefined, Validators.required],
      total_weight: [undefined, Validators.required],
      price_per_unit: [undefined, Validators.required]
    });
    this.onChanges();
  }

  onChanges(): void {
    this.productForm.get('quantity').valueChanges.subscribe(val => {
      this.setPackageWeight();
      this.setPrice('package');
    });
    this.productForm.get('total_weight').valueChanges.subscribe(val => {
      this.setPackageWeight();
      this.setPrice('unit');
    });
    this.productForm.get('package_price').valueChanges.subscribe(val => {
      this.setPrice('package');
    });
    this.productForm.get('price_per_unit').valueChanges.subscribe(val => {
      this.setPrice('unit');
    });
  }

  setPackageWeight(): void {
    if (this.product.quantity.value && this.product.total_weight.value) {
      this.productForm.patchValue({
        package_weight: (this.product.total_weight.value / this.product.quantity.value).toFixed(2)
      });
    } else {
      this.productForm.patchValue({ package_weight: 0 });
    }
  }

  setPrice(type: string): void {
    if (this.product.quantity.value && (this.product.package_price.value || this.product.price_per_unit.value)) {
      if (type === 'package') {
        this.productForm.patchValue({
          total_price: (this.product.quantity.value * this.product.package_price.value).toFixed(2)
        });
        this.productForm.patchValue(
          {
            price_per_unit: (this.product.total_price.value / this.product.total_weight.value).toFixed(2)
          },
          { emitEvent: false }
        );
      }
      if (type === 'unit') {
        this.productForm.patchValue({
          total_price: (this.product.total_weight.value * this.product.price_per_unit.value).toFixed(2)
        });
        this.productForm.patchValue(
          {
            package_price: (this.product.total_price.value / this.product.quantity.value).toFixed(2)
          },
          { emitEvent: false }
        );
      }
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
