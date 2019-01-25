import { Component, OnInit } from '@angular/core';
import { BaseProduct } from '../base-product';
import { ProductDataService } from '../product-data.service';
import { Product } from '@app/core/models/product';
import { ProductService } from '@app/core';
import { Router } from '@angular/router';
import { defaultValues } from '@app/shared/helpers/default_values';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.scss']
})
export class ProductReviewComponent extends BaseProduct implements OnInit {
  product: Product;

  constructor(
    protected productDataService: ProductDataService,
    private productService: ProductService,
    private router: Router
  ) {
    super(productDataService);
  }

  ngOnInit() {
    super.ngOnInit();

    this.productDataService.currentForm.subscribe(form => {
      this.product = form.value;
    });
  }

  product_image() {
    return this.product.image || defaultValues.product_picture;
  }

  targetStep(target: string) {
    const tab = $('a[href="#' + target + '"]');
    $(tab).trigger('click');
  }

  save() {
    if (this.form.valid) {
      this.product.gps_coordinates = ['43.6824666', '-79.54016200000001']; // TODO: change this
      this.productService.create(this.product).subscribe(() => {
        this.router.navigateByUrl('/product/list');
      });
    }
  }
}
