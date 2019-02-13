import { Component, OnInit, Input } from '@angular/core';
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
