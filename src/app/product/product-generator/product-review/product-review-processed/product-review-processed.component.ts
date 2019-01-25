import { Component } from '@angular/core';
import { ProductService } from '@app/core';
import { Router } from '@angular/router';
import { BaseProductReview } from '../base-product-review';
import { ProductDataService } from '../../product-data.service';

@Component({
  selector: 'app-product-review-processed',
  templateUrl: './product-review-processed.component.html',
  styleUrls: ['./product-review-processed.component.scss']
})
export class ProductReviewProcessedComponent extends BaseProductReview {
  constructor(
    protected productDataService: ProductDataService,
    protected productService: ProductService,
    protected router: Router
  ) {
    super(productDataService, productService, router);
  }
}
