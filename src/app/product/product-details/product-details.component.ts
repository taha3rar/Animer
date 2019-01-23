import { Component, OnInit, Input } from '@angular/core';
import { Product } from '@app/core/models/order/product';
import { countries } from '@app/shared/helpers/countries';
import { certifications } from '@app/shared/helpers/product_details';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  @Input()
  product: Product;
  isProcessed = false;
  countries = countries;
  allCerts = certifications;

  constructor() {}
  ngOnInit() {
    // if (this.product.product_type === 'processed') {
    //   this.isProcessed = true;
    // }
  }
}
