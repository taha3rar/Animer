import { Component } from '@angular/core';
import { countries } from '@app/shared/helpers/countries';
import { certifications } from '@app/shared/helpers/product_details';
import { ProductDataService } from '../product-data.service';
import { BaseProduct } from '../base-product';
import { defaultValues } from '@app/shared/helpers/default_values';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent extends BaseProduct {
  countries = countries;
  allCerts = certifications;

  constructor(protected productDataService: ProductDataService) {
    super(productDataService);
  }

  get validDetails() {
    const valid =
      this.form.controls.produce.valid &&
      this.form.controls.sku.valid &&
      this.form.controls.ingredients.valid &&
      this.form.controls.product_id.valid &&
      this.form.controls.variety.valid &&
      this.form.controls.approvals_and_certifications.valid &&
      this.form.controls.country_of_origin.valid &&
      this.form.controls.specification.valid &&
      this.form.controls.about.valid;

    return valid;
  }

  get product_image() {
    return this.isProcessed ? defaultValues.processed_picture : defaultValues.agri_picture;
  }

  receiveImage($event: string) {
    this.form.controls.image.setValue($event);
  }
}
