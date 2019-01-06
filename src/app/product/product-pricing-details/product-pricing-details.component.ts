import { Component, OnInit, Input } from '@angular/core';
import { currencies } from '@app/shared/_helpers/product_details';
import { Product } from '@app/core/models/order/product';

@Component({
  selector: 'app-product-pricing-details',
  templateUrl: './product-pricing-details.component.html',
  styleUrls: ['./product-pricing-details.component.scss']
})
export class ProductPricingDetailsComponent implements OnInit {
  currencies = currencies;
  isProcessed = false;

  @Input()
  product: Product;

  constructor() {}

  ngOnInit() {
    // if (this.product.product_type === 'processed') {
    //   this.isProcessed = true;
    // }
  }
}
