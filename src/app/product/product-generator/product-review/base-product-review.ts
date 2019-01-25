import { ProductDataService } from '../product-data.service';
import { Product } from '@app/core/models/product';
import { ProductService } from '@app/core';
import { Router } from '@angular/router';
import { BaseProduct } from '../base-product';
import { defaultValues } from '@app/shared/helpers/default_values';
import { OnInit } from '@angular/core';

export class BaseProductReview extends BaseProduct implements OnInit {
  product: Product;

  constructor(
    protected productDataService: ProductDataService,
    protected productService: ProductService,
    protected router: Router
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
