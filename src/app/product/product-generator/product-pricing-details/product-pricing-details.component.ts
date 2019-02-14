import { Component, Input, OnInit } from '@angular/core';
import { BaseProduct } from '../base-product';
import { ProductDataService } from '../product-data.service';
import { currencies } from '@app/shared/helpers/currencies';

@Component({
  selector: 'app-product-pricing-details',
  templateUrl: './product-pricing-details.component.html',
  styleUrls: ['./product-pricing-details.component.scss']
})
export class ProductPricingDetailsComponent extends BaseProduct implements OnInit {
  currencies = currencies;
  @Input()
  edit: boolean;

  constructor(protected productDataService: ProductDataService) {
    super(productDataService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.onChanges();
  }

  onChanges() {
    this.form.get('package_price').valueChanges.subscribe(val => {
      if (!this.isProcessed) {
        this.setAgriculturalTotalPrice('package');
      } else {
        this.setProcessedTotalPrice();
      }
    });
    this.form.get('price_per_unit').valueChanges.subscribe(val => {
      this.setAgriculturalTotalPrice('unit');
    });
  }

  setProcessedTotalPrice() {
    if (this.form.controls.quantity.value && this.form.controls.package_price.value) {
      this.form.patchValue({
        total_price: (this.form.controls.quantity.value * this.form.controls.package_price.value).toFixed(2)
      });
    } else {
      this.form.patchValue({ total_price: 0 });
    }
  }

  setAgriculturalTotalPrice(type: string) {
    if (
      this.form.controls.quantity.value &&
      (this.form.controls.package_price.value || this.form.controls.price_per_unit.value)
    ) {
      if (type === 'package') {
        this.form.patchValue({
          total_price: (this.form.controls.quantity.value * this.form.controls.package_price.value).toFixed(2)
        });
        this.form.patchValue(
          {
            price_per_unit: (this.form.controls.total_price.value / this.form.controls.total_weight.value).toFixed(2)
          },
          { emitEvent: false }
        );
      }
      if (type === 'unit') {
        this.form.patchValue({
          total_price: (this.form.controls.total_weight.value * this.form.controls.price_per_unit.value).toFixed(2)
        });
        this.form.patchValue(
          {
            package_price: (this.form.controls.total_price.value / this.form.controls.quantity.value).toFixed(2)
          },
          { emitEvent: false }
        );
      }
    } else {
      this.form.patchValue({ total_price: 0 });
    }
  }

  get quantity() {
    return this.form.controls.quantity.value;
  }

  get weight_unit() {
    return this.form.controls.weight_unit.value;
  }

  get validPricing() {
    const valid =
      this.form.controls.currency.valid &&
      this.form.controls.total_price.valid &&
      this.form.controls.package_price.valid &&
      this.form.controls.quantity.valid &&
      this.form.controls.total_weight.valid &&
      this.form.controls.price_per_unit.valid &&
      this.form.controls.pricing_details.valid;

    return valid;
  }

  onSubmit() {
    this.form.controls.currency.markAsTouched({ onlySelf: true });
    this.form.controls.total_weight.markAsTouched({ onlySelf: true });
    this.form.controls.price_per_unit.markAsTouched({ onlySelf: true });
    this.form.controls.total_price.markAsTouched({ onlySelf: true });
    this.form.controls.package_price.markAsTouched({ onlySelf: true });
  }
}
