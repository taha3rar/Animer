import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductDataService } from './product-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepperService } from '@app/core/stepper.service';
import { Product } from '@app/core/models/product';

@Component({
  selector: 'app-product-generator',
  templateUrl: './product-generator.component.html',
  styleUrls: ['./product-generator.component.scss']
})
export class ProductGeneratorComponent implements OnInit {
  product: Product = new Product();
  edit = false;
  isProcessed = false;
  productForm: FormGroup;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productDataService: ProductDataService,
    private stepperService: StepperService
  ) {}

  ngOnInit() {
    if (this.route.snapshot.params['id']) {
      this.product = this.route.snapshot.data['product'];
      this.productDataService.setProductId(this.product._id);
      this.edit = true;
    }
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.productDataService.setType(params.get('type') || 'agricultural'); // default
      this.isProcessed = this.productDataService.isProcessed();

      this.productForm = this.formBuilder.group({
        product_type: [this.productDataService.type, Validators.required],
        produce: [this.product.produce || undefined, Validators.required],
        sku: [this.product.sku || undefined],
        product_id: [this.product.product_id || undefined],
        ingredients: [this.product.ingredients || undefined],
        type_of_package: [this.product.type_of_package || undefined, Validators.required],
        items_per_package: [
          this.product.items_per_package || undefined,
          this.productDataService.requiredForProcessed()
        ],
        quantity: [this.product.quantity || undefined, Validators.required],
        total_amount_items: [this.product.total_amount_items || undefined],
        package_details: this.product.package_details || [undefined],
        package_price: [this.product.package_price || undefined, Validators.required],
        total_price: [this.product.total_price || undefined, Validators.required],
        currency: [this.product.currency || undefined, Validators.required],
        pricing_details: [this.product.pricing_details || undefined],
        gps_coordinates: [this.product.gps_coordinates || undefined, Validators.required],
        loading_location: [this.product.loading_location || undefined, Validators.required],
        variety: [this.product.variety || undefined, this.productDataService.requiredForAgricultural()],
        approvals_and_certifications: [this.product.approvals_and_certifications || undefined],
        country_of_origin: [this.product.country_of_origin || undefined],
        specification: [this.product.specification || undefined],
        about: [this.product.about || undefined],
        image: [this.product.image || undefined],
        package_weight: [this.product.package_weight || undefined, this.productDataService.requiredForAgricultural()],
        weight_unit: [this.product.weight_unit || undefined, this.productDataService.requiredForAgricultural()],
        total_weight: [this.product.total_weight || undefined, this.productDataService.requiredForAgricultural()],
        estimated_weight_values: [this.product.estimated_weight_values || false],
        individual_item_details: [this.product.individual_item_details || undefined],
        item_package_type: [
          this.product.item_package_type || undefined,
          this.productDataService.requiredForProcessed()
        ],
        item_measurement_unit: [
          this.product.item_measurement_unit || undefined,
          this.productDataService.requiredForProcessed()
        ],
        item_measurement_amount: [
          this.product.item_measurement_amount || undefined,
          this.productDataService.requiredForProcessed()
        ],
        item_package_details: [this.product.item_package_details],
        price_per_unit: [this.product.price_per_unit || undefined, this.productDataService.requiredForAgricultural()],
        international_buyers: [this.product.international_buyers],
        excluded_countries: [this.product.excluded_countries || undefined, Validators.required],
        tariff_code: [this.product.tariff_code || undefined, Validators.required]
      });
      this.productDataService.setForm(this.productForm);
    });
    this.stepperService.stepperInit();
  }

  back() {
    this.location.back();
  }
}
