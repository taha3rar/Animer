import { Component } from '@angular/core';
import { BaseProductReview } from '../base-product-review';
import { ProductDataService } from '../../product-data.service';
import { ProductService } from '@app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-review-agricultural',
  templateUrl: './product-review-agricultural.component.html',
  styleUrls: ['./product-review-agricultural.component.scss']
})
export class ProductReviewAgriculturalComponent extends BaseProductReview {
  constructor(
    protected productDataService: ProductDataService,
    protected productService: ProductService,
    protected router: Router
  ) {
    super(productDataService, productService, router);
  }
}
