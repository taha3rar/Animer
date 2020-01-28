import { Component, OnInit, Input } from '@angular/core';
import { Product } from '@app/core/models/product';
import { defaultValues } from '@app/shared/helpers/default_values';

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
    return this.product.product_type === 'agricultural' || !this.product.product_type;
  }

  get processed_product() {
    return this.product.product_type === 'processed';
  }

  get input_product() {
    return this.product.product_type === 'input';
  }

  product_image() {
    if (!this.product.image) {
      return this.product.product_type === 'processed' ? defaultValues.processed_picture : defaultValues.agri_picture;
    }
    return this.product.image;
  }
}
