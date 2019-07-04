import { AlertsService } from '@app/core/alerts.service';
import { CanComponentDeactivate } from '@app/shared/guards/confirmation.guard';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { defaultValues } from '@app/shared/helpers/default_values';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { currencies } from '@app/shared/helpers/currencies';
import { measureUnits } from '@app/shared/helpers/measure';
import { ProductService } from '@app/core';
import { Router } from '@angular/router';
import { Product } from '@app/core/models/product';
import swal from 'sweetalert';
import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';

@Component({
  selector: 'app-processed-product-generator',
  templateUrl: './processed-product-generator.component.html',
  styleUrls: ['./processed-product-generator.component.scss']
})
export class ProcessedProductGeneratorComponent extends BaseValidationComponent
  implements OnInit, CanComponentDeactivate {
  newProduct: Product;
  productImage = defaultValues.processed_picture;
  productForm: FormGroup;
  currencies = currencies;
  units = measureUnits;
  onUpdate: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<ProcessedProductGeneratorComponent>,
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
      product_type: ['processed', Validators.required],
      produce: [product ? product.produce : undefined, Validators.required],
      sku: [product ? product.sku : undefined],
      type_of_package: [product ? product.type_of_package : undefined, Validators.required],
      items_per_package: [product ? product.items_per_package : undefined, Validators.required],
      quantity: [product ? product.quantity : undefined, Validators.required],
      total_amount_items: [product ? product.total_amount_items : 0],
      package_price: [product ? product.package_price : undefined, Validators.required],
      total_price: [product ? product.total_price : 0, Validators.required],
      currency: [product ? product.currency : undefined, Validators.required],
      item_package_details: [product ? product.item_package_details : true, Validators.required],
      item_package_type: [product ? product.item_package_type : undefined, Validators.required],
      item_measurement_unit: [product ? product.item_measurement_unit : undefined, Validators.required],
      item_measurement_amount: [product ? product.item_measurement_amount : undefined, Validators.required]
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

  @HostListener('window:beforeunload')
  confirm() {
    return !this.productForm.dirty;
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
      this.disableSubmitButton(true);
      this.newProduct._id = this.data.product._id;
      this.productService.update(this.newProduct._id, this.newProduct).subscribe(
        () => {
          this.alerts.showAlert('The product has been updated!');
          this.dialog.close();
          this.router.navigateByUrl('/product/list');
        },
        err => {
          this.disableSubmitButton(false);
        }
      );
    }
  }
}
