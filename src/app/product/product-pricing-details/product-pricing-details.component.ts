import { Component, OnInit } from '@angular/core';
import { currencies } from '@app/shared/_helpers/product_details';

@Component({
  selector: 'app-product-pricing-details',
  templateUrl: './product-pricing-details.component.html',
  styleUrls: ['./product-pricing-details.component.scss']
})
export class ProductPricingDetailsComponent implements OnInit {
  currencies = currencies;

  constructor() {}

  ngOnInit() {}
}
