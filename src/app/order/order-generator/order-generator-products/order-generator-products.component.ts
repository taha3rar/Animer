import { Component, Input, OnInit } from '@angular/core';
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
  inventoryProducts: any[];
  agriculturalProducts: Product[];
  processedProducts: Product[];
  addedProducts: ProductInvoice[] = [];
  noInventory: boolean;
  packagesSum = 0;

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
          this.inventoryProducts = data;
          this.inventoryProducts.length >= 1 ? (this.noInventory = false) : (this.noInventory = true);
          this.inventoryProducts.forEach((product: Product) => {
            product['quantityMax'] = product.quantity;
            product.quantity = 0;
          });
          this.agriculturalProducts = this.inventoryProducts.filter(p => p.product_type === 'agricultural');
          this.processedProducts = this.inventoryProducts.filter(p => p.product_type === 'processed');
        });
      }
    });
    this.orderDataService.currentProductList.subscribe(data => {
      if (data) {
        this.addedProducts = data;
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
      this.packagesSum++;
    } else {
      product.quantity = product.quantityMax;
    }
    this.productValidation(product);
  }
  decrementQuantity(product: any) {
    if (product.quantity > 0) {
      product.quantity -= 1;
      this.packagesSum--;
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
      // Product deleted from addedProducts array if quantity set to 0
      for (let i = 0; i < this.addedProducts.length; i++) {
        if (this.addedProducts[i].numericId === product.numericId) {
          this.order['subtotal'].setValue(this.order.subtotal.value - product['product_subtotal']);
          this.addedProducts.splice(i, 1);
        }
      }
      if (!this.order.subtotal.value || this.addedProducts.length <= 0) {
        this.order['currency'].setValue(undefined);
        this.order['subtotal'].setValue(null);
      }
    } else {
      if (!this.order.currency.value) {
        this.order['currency'].setValue(product.currency);
      }
      // We check if the product is already in the addedProducts array
      for (let i = 0; i < this.addedProducts.length; i++) {
        if (this.addedProducts[i].numericId === product.numericId) {
          this.order['subtotal'].setValue(this.order.subtotal.value - product['product_subtotal']);
          // If so we update the product's quantity and update the subtotal
          this.addedProducts[i].quantity = product.quantity;
          this.updateTotal(this.addedProducts[i]);
          return;
        }
      }
      // If the product isn't in the addedProducts array, we update the subtotal and push it to the addedProducts array
      this.updateTotal(product);
      this.addedProducts.push(product);
    }
  }

  updateTotal(product: any) {
    if (product.product_type === 'agricultural') {
      product['total_weight'] = product.package_weight * product.quantity;
      product['product_subtotal'] = product.package_price * product.quantity;
    }
    if (product.product_type === 'processed') {
      product['product_subtotal'] = product.package_price * product.quantity;
    }
    if (product.product_type === 'input') {
      product['product_subtotal'] = product.price_per_unit * product.quantity;
    }
    this.order['subtotal'].setValue(this.order.subtotal.value + product['product_subtotal']);
  }

  product_image(product: Product) {
    if (!product.image) {
      return product.product_type === 'processed' ? defaultValues.processed_picture : defaultValues.agri_picture;
    }
    return product.image;
  }

  deleteProducts() {
    this.addedProducts = [];
    this.order['subtotal'].setValue(0);
    this.order['currency'].setValue(undefined);
  }

  toOrderGenerator() {
    this.orderDataService.setProductList(this.addedProducts);
    this.orderDataService.setGeneratorStep('order');
    this.orderDataService.triggerTourStep();
  }
}
