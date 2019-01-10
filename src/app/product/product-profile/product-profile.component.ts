import { Component, OnInit, Input } from '@angular/core';
import { Product } from '@app/core/models/product';
import { defaultValues } from '@app/shared/_helpers/default_values';

@Component({
  selector: 'app-product-profile',
  templateUrl: './product-profile.component.html',
  styleUrls: ['./product-profile.component.scss']
})
export class ProductProfileComponent implements OnInit {
  @Input()
  product: Product;

  constructor() {}

  ngOnInit() {}

  get agricultural_product() {
    return this.product.product_type !== 'processed' || !this.product.product_type;
  }

  get processed_product() {
    return this.product.product_type === 'processed';
  }

  product_image() {
    return this.product.image || defaultValues.product_picture;
  }
}
