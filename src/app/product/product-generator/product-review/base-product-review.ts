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

  get product_image() {
    if (!this.product.image) {
      return this.product.product_type === 'processed' ? defaultValues.processed_picture : defaultValues.agri_picture;
    }
    return this.product.image;
  }

  targetStep(target: string) {
    const tab = $('a[href="#' + target + '"]');
    $(tab).trigger('click');
  }

  save() {
    if (this.form.valid) {
      this.productService.create(this.product).subscribe(() => {
        this.router.navigateByUrl('/product/list');
      });
    }
  }

  update() {
    if (this.form.valid) {
      this.product._id = this.productDataService.productId;
      this.productService.update(this.product._id, this.product).subscribe(() => {
        this.router.navigateByUrl('/product/list');
      });
    }
  }
}
