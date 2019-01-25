import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductDataService } from './product-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-generator',
  templateUrl: './product-generator.component.html',
  styleUrls: ['./product-generator.component.scss']
})
export class ProductGeneratorComponent implements OnInit {
  isProcessed = false;
  productForm: FormGroup;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productDataService: ProductDataService
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.productDataService.setType(params.get('type') || 'agricultural'); // default

      this.productForm = this.formBuilder.group({
        product_type: [this.productDataService.type, Validators.required],
        produce: [undefined, Validators.required],
        sku: [undefined],
        product_id: [undefined],
        ingredients: [undefined],
        type_of_package: [undefined, Validators.required],
        items_per_package: [undefined, Validators.required],
        quantity: [undefined, Validators.required],
        total_amount_items: [undefined],
        package_details: [undefined],
        package_price: [undefined, Validators.required],
        total_price: [undefined, Validators.required],
        currency: [undefined, Validators.required],
        pricing_details: [undefined],
        gps_coordinates: [undefined, Validators.required],
        loading_location: [undefined, Validators.required],
        variety: [undefined],
        approvals_and_certifications: [undefined],
        country_of_origin: [undefined],
        specification: [undefined],
        about: [undefined],
        package_weight: [undefined],
        weight_unit: [undefined],
        total_weight: [undefined],
        estimated_weight_values: [undefined],
        individual_item_details: [undefined],
        item_package_type: [undefined, this.productDataService.requiredForProcessed()],
        item_measurement_unit: [undefined, this.productDataService.requiredForProcessed()],
        item_measurement_amount: [undefined, this.productDataService.requiredForProcessed()],
        item_package_details: [true],
        price_per_unit: [undefined],
        international_buyers: [true],
        excluded_countries: [undefined, Validators.required],
        tariff_code: [undefined, Validators.required]
      });

      this.productDataService.setForm(this.productForm);
    });
  }

  back() {
    this.location.back();
  }
}
