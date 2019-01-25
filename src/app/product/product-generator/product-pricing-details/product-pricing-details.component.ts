import { Component } from '@angular/core';
import { currencies } from '@app/shared/helpers/product_details';
import { BaseProduct } from '../base-product';
import { ProductDataService } from '../product-data.service';

@Component({
  selector: 'app-product-pricing-details',
  templateUrl: './product-pricing-details.component.html',
  styleUrls: ['./product-pricing-details.component.scss']
})
export class ProductPricingDetailsComponent extends BaseProduct {
  currencies = currencies;

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
}
