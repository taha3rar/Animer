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
}
