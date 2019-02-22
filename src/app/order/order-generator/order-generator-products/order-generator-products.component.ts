import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from '@app/core/models/product';
import { ProductService } from '@app/core/api/product.service';
import { OrderDataService } from '../order-data.service';
import { BaseNavigationComponent } from '@app/shared/components/base-navigation/base-navigation.component';
import { defaultValues } from '@app/shared/helpers/default_values';

declare const $: any;
@Component({
  selector: 'app-order-generator-products',
  templateUrl: './order-generator-products.component.html',
  styleUrls: ['./order-generator-products.component.scss']
})
export class OrderGeneratorProductsComponent extends BaseNavigationComponent implements OnInit {
  term: string;
  form: FormGroup;
  products: Product[];
  agriculturalProducts: Product[];
  processedProducts: Product[];
  newProducts: Product[] = [];
  currency: string = undefined;

  constructor(private productService: ProductService, private orderDataService: OrderDataService) {
    super();
  }

  ngOnInit() {
    this.orderDataService.currentForm.subscribe(form => {
      this.form = form;
      if (this.seller._id) {
        this.productService.getByUser(this.seller._id).subscribe(data => {
          this.products = data;
          this.products.forEach((product: Product) => {
            product['quantityMax'] = product.quantity;
            product.quantity = 0;
          });
          this.agriculturalProducts = this.products.filter(p => p.product_type === 'agricultural');
          this.processedProducts = this.products.filter(p => p.product_type === 'processed');
        });
      }
    });
  }

  get order() {
    return this.form.controls;
  }

  get seller() {
    return this.form.controls.seller.value;
  }

  incrementQuantity(product: any) {
    if (product.quantity < product.quantityMax) {
      product.quantity += 1;
    } else {
      product.quantity = product.quantityMax;
    }
    this.productsValidation(false);
  }
  decrementQuantity(product: any) {
    if (product.quantity > 0) {
      product.quantity -= 1;
    } else {
      product.quantity = 0;
    }
    this.productsValidation(false);
  }

  checkProductInput(product: any) {
    if (product.quantity > product.quantityMax) {
      product.quantity = product.quantityMax;
    } else if (product.quantity <= 0) {
      product.quantity = 0;
    } else {
      product.quantity = product.quantity;
    }
    this.productsValidation(false);
  }

  productsValidation(submit: boolean) {
    this.order['subtotal'].setValue(0);
    this.products.forEach(product => {
      if (product.quantity > 0) {
        if (!this.currency) {
          this.currency = product.currency;
        }
        if (product.product_type === 'agricultural') {
          product['total_weight'] = product.package_weight * product.quantity;
          product['product_subtotal'] = product.package_price * product.quantity;
        }
        if (product.product_type === 'processed') {
          product['product_subtotal'] = product.package_price * product.quantity;
        }
        this.order['subtotal'].setValue(this.order.subtotal.value + product['product_subtotal']);
        if (submit) {
          this.newProducts.push(product);
        }
      }
    });
    if (this.order.subtotal.value === 0) {
      this.currency = undefined;
    }
  }

  product_image(product: Product) {
    if (!product.image) {
      return product.product_type === 'processed' ? defaultValues.processed_picture : defaultValues.agri_picture;
    }
    return product.image;
  }

  deleteProducts() {
    this.newProducts = [];
    this.order['subtotal'].setValue(0);
    this.order['currency'].setValue(undefined);
  }

  toOrderGenerator() {
    this.productsValidation(true);
    if (this.currency) {
      this.order['currency'].setValue(this.currency);
    }
    this.orderDataService.setProductList(this.newProducts);
  }
}
