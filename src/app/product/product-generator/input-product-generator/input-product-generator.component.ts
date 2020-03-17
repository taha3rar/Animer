import { SpinnerToggleService } from './../../../shared/services/spinner-toggle.service';
import { Component, OnInit, Inject } from '@angular/core';
import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from '@app/core/alerts.service';
import { ProductService } from '@app/core';
import { Product } from '@app/core/models/order/product';
import { defaultValues } from '@app/shared/helpers/default_values';
import { currencies } from '@app/shared/helpers/currencies';
import { measureUnits } from '@app/shared/helpers/measure';
import { inputProductTypes } from '@app/shared/helpers/input_product_types';
import swal from 'sweetalert';

@Component({
  selector: 'app-input-product-generator',
  templateUrl: './input-product-generator.component.html',
  styleUrls: ['./input-product-generator.component.scss']
})
export class InputProductGeneratorComponent extends BaseValidationComponent implements OnInit {
  newProduct: Product;
  productImage = defaultValues.agri_picture;
  productForm: FormGroup;
  currencies = currencies;
  units = measureUnits;
  input_product_types = inputProductTypes;
  onUpdate: boolean;
  isItemVisible = false;
  isItemDescriptionVisible = false;
  otherTypeSelected = false;
  itemFields = [
    { field: 'weight_unit', for: 'consumable' },
    { field: 'item_measurement_amount', for: 'consumable' },
    { field: 'item_description', for: 'capital' }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<InputProductGeneratorComponent>,
    private productService: ProductService,
    private router: Router,
    private alerts: AlertsService,
    private spinnerService: SpinnerToggleService
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
      product_type: ['input', Validators.required],
      produce: [product ? product.produce : undefined, Validators.required],
      input_produce_type: [product ? product.input_produce_type : undefined, Validators.required],
      item_measurement_amount: [product ? product.item_measurement_amount : 0],
      total_price: [product ? product.total_price : 0, Validators.required],
      currency: [product ? product.currency : undefined, Validators.required],
      item_description: [product ? product.item_description : undefined],
      quantity: [product ? product.quantity : undefined],
      weight_unit: [product ? product.weight_unit : undefined],
      price_per_unit: [product ? product.price_per_unit : undefined, Validators.required],
      other_input_type: [product ? product.other_input_type : undefined]
    });
  }

  get product() {
    return this.productForm.controls;
  }

  setPriceUnit() {
    if (this.product.quantity.value && this.product.price_per_unit.value) {
      // tslint:disable-next-line:max-line-length
      this.product.total_price.setValue(
        Number((this.product.price_per_unit.value * this.product.quantity.value).toFixed(2))
      );
    } else {
      this.product.total_price.setValue(undefined);
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

  checkInputType(obj_value: any) {
    this.otherTypeSelected = false;
    this.isItemVisible = false;
    this.isItemDescriptionVisible = false;
    this.input_product_types.forEach(item => {
      if (item.value === obj_value) {
        item.type === 'consumable' ? (this.isItemVisible = true) : (this.isItemDescriptionVisible = true);
        this.setRequiredFields(item.type);
      }
    });
    if (obj_value === 'Other') {
      this.otherTypeSelected = true;
      this.setRequiredFields('Capital', 'Other');
    }
  }

  setRequiredFields(obj_type: string, obj_val?: string) {
    this.productForm.controls['other_input_type'].reset();
    this.productForm.controls['other_input_type'].setValidators([]);
    this.productForm.controls['other_input_type'].updateValueAndValidity();
    this.productForm.controls['item_description'].setValidators([]);
    this.productForm.controls['item_description'].updateValueAndValidity();
    this.productForm.controls['item_description'].reset();
    this.itemFields.forEach(item => {
      if (item.for === obj_type) {
        this.productForm.controls[item.field].setValidators([Validators.required]);
      } else {
        this.productForm.controls[item.field].setValidators([]);
        this.productForm.controls[item.field].reset();
      }
      this.productForm.controls[item.field].updateValueAndValidity();
    });
    if (obj_val === 'Other') {
      this.productForm.controls['other_input_type'].setValidators([Validators.required]);
      this.productForm.controls['other_input_type'].updateValueAndValidity();
      this.productForm.controls['item_description'].setValidators([Validators.required]);
      this.productForm.controls['item_description'].updateValueAndValidity();
    }
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
    this.spinnerService.showSpinner();
    if (!this.onUpdate) {
      this.disableSubmitButton(true);
      if (this.productForm.valid) {
        this.productService.create(this.newProduct).subscribe(
          () => {
            this.spinnerService.hideSpinner();
            this.alerts.showAlert('New product profile has been created!');
            this.dialog.close();
            this.router.navigateByUrl(this.router.url);
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
          this.spinnerService.hideSpinner();
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
}
