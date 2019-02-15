import { Component, OnInit, Input } from '@angular/core';
import { measureUnits } from '@app/shared/helpers/measure';
import { BaseProduct } from '../base-product';
import { ProductDataService } from '../product-data.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-product-packing-details',
  templateUrl: './product-packing-details.component.html',
  styleUrls: ['./product-packing-details.component.scss']
})
export class ProductPackingDetailsComponent extends BaseProduct implements OnInit {
  units = measureUnits;
  @Input()
  edit: boolean;

  constructor(protected productDataService: ProductDataService) {
    super(productDataService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.form.controls.item_package_details.value) {
      this.form.get('item_package_type').disable();
      this.form.get('item_package_type').setValue('');
      this.form.get('item_measurement_unit').disable();
      this.form.get('item_measurement_unit').setValue('');
      this.form.get('item_measurement_amount').disable();
      this.form.get('item_measurement_amount').setValue('');
    }
    // processed logic
    this.form.get('item_package_details').valueChanges.subscribe(packageDetails => {
      if (packageDetails) {
        this.form.get('item_package_type').enable();
        this.form.get('item_package_type').setValidators([this.productDataService.requiredForProcessed()]);
        this.form.get('item_measurement_unit').enable();
        this.form.get('item_measurement_unit').setValidators([this.productDataService.requiredForProcessed()]);
        this.form.get('item_measurement_amount').enable();
        this.form.get('item_measurement_amount').setValidators([this.productDataService.requiredForProcessed()]);
      } else {
        this.form.get('item_package_type').disable();
        this.form.get('item_package_type').setValue('');
        this.form.get('item_measurement_unit').disable();
        this.form.get('item_measurement_unit').setValue('');
        this.form.get('item_measurement_amount').disable();
        this.form.get('item_measurement_amount').setValue('');
      }
    });
    this.onChanges();
  }

  onChanges() {
    this.form.get('quantity').valueChanges.subscribe(val => {
      if (!this.isProcessed) {
        this.setTotalWeight();
      } else {
        this.setTotalItems();
      }
    });
    this.form.get('package_weight').valueChanges.subscribe(val => {
      this.setTotalWeight();
    });
    this.form.get('items_per_package').valueChanges.subscribe(val => {
      this.setTotalItems();
    });
  }

  setTotalWeight() {
    if (this.form.controls.quantity.value && this.form.controls.package_weight.value) {
      this.form.patchValue({
        total_weight: (this.form.controls.quantity.value * this.form.controls.package_weight.value).toFixed(2)
      });
    } else {
      this.form.patchValue({ total_weight: 0 });
    }
  }

  setTotalItems() {
    if (this.form.controls.quantity.value && this.form.controls.items_per_package.value) {
      this.form.patchValue({
        total_amount_items: (this.form.controls.quantity.value * this.form.controls.items_per_package.value).toFixed(2)
      });
    } else {
      this.form.patchValue({ total_amount_items: 0 });
    }
  }

  get validPacking() {
    const valid =
      this.form.controls.type_of_package.valid &&
      this.form.controls.items_per_package.valid &&
      this.form.controls.quantity.valid &&
      this.form.controls.total_amount_items.valid &&
      this.form.controls.package_details.valid &&
      this.form.controls.package_weight.valid &&
      this.form.controls.weight_unit.valid &&
      this.form.controls.total_weight.valid &&
      this.form.controls.estimated_weight_values.valid &&
      (this.form.controls.item_package_type.valid || this.form.controls.item_package_type.disabled) &&
      (this.form.controls.item_measurement_unit.valid || this.form.controls.item_measurement_unit.disabled) &&
      (this.form.controls.item_measurement_amount.valid || this.form.controls.item_measurement_amount.disabled);

    return valid;
  }

  onSubmit() {
    this.form.controls.type_of_package.markAsTouched({ onlySelf: true });
    this.form.controls.items_per_package.markAsTouched({ onlySelf: true });
    this.form.controls.quantity.markAsTouched({ onlySelf: true });
    this.form.controls.package_weight.markAsTouched({ onlySelf: true });
    this.form.controls.weight_unit.markAsTouched({ onlySelf: true });
    this.form.controls.total_weight.markAsTouched({ onlySelf: true });
    this.form.controls.item_package_type.markAsTouched({ onlySelf: true });
    this.form.controls.item_measurement_unit.markAsTouched({ onlySelf: true });
    this.form.controls.item_measurement_amount.markAsTouched({ onlySelf: true });
  }
}
