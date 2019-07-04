import { AlertsService } from '@app/core/alerts.service';
import { CanComponentDeactivate } from './../../../shared/guards/confirmation.guard';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { defaultValues } from '@app/shared/helpers/default_values';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { currencies } from '@app/shared/helpers/currencies';
import { measureUnits } from '@app/shared/helpers/measure';
import { Product } from '@app/core/models/order/product';
import { ProductService } from '@app/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';

@Component({
  selector: 'app-agricultural-product-generator',
  templateUrl: './agricultural-product-generator.component.html',
  styleUrls: ['./agricultural-product-generator.component.scss']
})
export class AgriculturalProductGeneratorComponent extends BaseValidationComponent
  implements OnInit, CanComponentDeactivate {
  newProduct: Product;
  productImage = defaultValues.agri_picture;
  productForm: FormGroup;
  currencies = currencies;
  units = measureUnits;
  onUpdate: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<AgriculturalProductGeneratorComponent>,
    private productService: ProductService,
    private router: Router,
    private alerts: AlertsService
  ) {
    super();
  }

  ngOnInit() {
    this.onUpdate = false;
    const product = this.data.product;
    if (this.data.product) {
      this.onUpdate = true;
      if (this.data.product.image) {
        this.productImage = this.data.product.image;
      }
    }
    this.productForm = this.formBuilder.group({
      product_type: ['agricultural', Validators.required],
      produce: [product ? product.produce : undefined, Validators.required],
      sku: [product ? product.sku : undefined],
      type_of_package: [product ? product.type_of_package : undefined, Validators.required],
      quantity: [product ? product.quantity : 0, Validators.required],
      package_price: [product ? product.package_price : undefined, Validators.required],
      total_price: [product ? product.total_price : 0, Validators.required],
      currency: [product ? product.currency : undefined, Validators.required],
      variety: [product ? product.variety : undefined, Validators.required],
      package_weight: [product ? product.package_weight : undefined, Validators.required],
      weight_unit: [product ? product.weight_unit : undefined, Validators.required],
      total_weight: [product ? product.total_weight : undefined, Validators.required],
      price_per_unit: [product ? product.price_per_unit : undefined, Validators.required]
    });
    this.onChanges();
  }

  @HostListener('window:beforeunload')
  confirm() {
    return !this.productForm.dirty;
  }

  onChanges(): void {
    this.productForm.get('package_weight').valueChanges.subscribe(val => {
      this.setPackageAmount();
      this.setPrice('unit');
    });
    this.productForm.get('total_weight').valueChanges.subscribe(val => {
      this.setPackageAmount();
      this.setPrice('unit');
    });
    this.productForm.get('package_price').valueChanges.subscribe(val => {
      this.setPrice('package');
    });
    this.productForm.get('price_per_unit').valueChanges.subscribe(val => {
      this.setPrice('unit');
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

  setPrice(type: string): void {
    if (this.product.total_weight.value && this.product.price_per_unit.value) {
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
    if (!this.productForm.valid && this.productForm.dirty) {
      swal({
        text: 'Are you sure you want to leave this page? All information will be lost!',
        buttons: ['Cancel', 'Yes'],
        icon: 'warning'
      }).then(value => {
        if (value) {
          this.dialog.close();
        } else {
          return false;
        }
      });
    } else {
      this.dialog.close();
    }
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

  checkForm(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.checkForm(control);
      }
    });
  }

  submit() {
    this.newProduct = this.productForm.value;
    this.newProduct.image = this.productImage;
    if (!this.onUpdate) {
      this.disableSubmitButton(true);
      if (this.productForm.valid) {
        this.productService.create(this.newProduct).subscribe(
          () => {
            this.alerts.showAlert('New product profile has been created!');
            this.dialog.close();
            this.router.navigateByUrl('/product/list');
          },
          err => {
            this.disableSubmitButton(false);
          }
        );
      }
    } else {
      this.disableDraftButton(true);
      this.newProduct._id = this.data.product._id;
      this.productService.update(this.newProduct._id, this.newProduct).subscribe(
        () => {
          this.alerts.showAlert('The product has been updated!');
          this.dialog.close();
          this.router.navigateByUrl('/product/list');
        },
        err => {
          this.disableDraftButton(false);
        }
      );
    }
  }
}
