import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from '@app/core/models/product';
import { ProductService } from '@app/core/api/product.service';
import { OrderDataService } from '../order-data.service';
import { BaseNavigationComponent } from '@app/shared/components/base-navigation/base-navigation.component';
import { defaultValues } from '@app/shared/helpers/default_values';
import { ProductInvoice } from '@app/core/models/invoice/product-invoice';

declare const $: any;
@Component({
  selector: 'app-order-generator-products',
  templateUrl: './order-generator-products.component.html',
  styleUrls: ['./order-generator-products.component.scss']
})
export class OrderGeneratorProductsComponent extends BaseNavigationComponent implements OnInit {
  term: string;
  form: FormGroup;
  products: any[];
  agriculturalProducts: Product[];
  processedProducts: Product[];
  newProducts: ProductInvoice[] = [];
  noInventory: boolean;

  constructor(private productService: ProductService, private orderDataService: OrderDataService) {
    super();
  }

  ngOnInit() {
    this.noInventory = false;
    this.orderDataService.setProductList(undefined);
    this.orderDataService.currentForm.subscribe(form => {
      this.form = form;
      if (this.seller._id) {
        this.productService.getByUser(this.seller._id).subscribe(data => {
          this.products = data;
          this.products.length > 1 ? (this.noInventory = false) : (this.noInventory = true);
          this.products.forEach((product: Product) => {
            product['quantityMax'] = product.quantity;
            product.quantity = 0;
          });
          this.agriculturalProducts = this.products.filter(p => p.product_type === 'agricultural');
          this.processedProducts = this.products.filter(p => p.product_type === 'processed');
        });
      }
    });
    this.orderDataService.currentProductList.subscribe(data => {
      if (data) {
        this.newProducts = data;
      }
    });
  }

  get order() {
    return this.form.controls;
  }

  get seller() {
    return this.form.controls.seller.value;
  }

  // button change
  incrementQuantity(product: any) {
    if (product.quantity < product.quantityMax) {
      product.quantity += 1;
    } else {
      product.quantity = product.quantityMax;
    }
    this.productValidation(product);
  }
  decrementQuantity(product: any) {
    if (product.quantity > 0) {
      product.quantity -= 1;
    } else {
      product.quantity = 0;
    }
    this.productValidation(product);
  }

  // manually change
  checkProductInput(product: any) {
    if (product.quantity > product.quantityMax) {
      product.quantity = product.quantityMax;
    } else if (product.quantity <= 0) {
      product.quantity = 0;
    } else {
      product.quantity = product.quantity;
    }
    this.productValidation(product);
  }

  productValidation(product: any) {
    if (product.quantity < 1) {
      for (let i = 0; i < this.newProducts.length; i++) {
        if (this.newProducts[i].numericId === product.numericId) {
          this.updateProduct(product, true);
          this.newProducts.splice(i, 1);
        }
      }
      if (!this.order.subtotal.value || this.newProducts.length <= 0) {
        this.order['currency'].setValue(undefined);
        this.order['subtotal'].setValue(null);
      }
    } else {
      if (!this.order.currency.value) {
        this.order['currency'].setValue(product.currency);
      }
      for (let i = 0; i < this.newProducts.length; i++) {
        if (this.newProducts[i].numericId === product.numericId) {
          this.updateProduct(this.newProducts[i], true);
          this.newProducts[i].quantity = product.quantity;
          this.updateProduct(this.newProducts[i], false);
          return;
        }
      }
      this.updateProduct(product, false);
      this.newProducts.push(product);
    }
  }

  updateProduct(product: any, minusTotal: boolean) {
    if (minusTotal) {
      this.order['subtotal'].setValue(this.order.subtotal.value - product['product_subtotal']);
    } else {
      if (product.product_type === 'agricultural') {
        product['total_weight'] = product.package_weight * product.quantity;
        product['product_subtotal'] = product.package_price * product.quantity;
      }
      if (product.product_type === 'processed') {
        product['product_subtotal'] = product.package_price * product.quantity;
      }
      this.order['subtotal'].setValue(this.order.subtotal.value + product['product_subtotal']);
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
    this.orderDataService.setProductList(this.newProducts);
  }
}
