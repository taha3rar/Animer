import { BaseValidationComponent } from './../../../shared/components/base-validation/base-validation.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Order } from '@app/core/models/order/order';
import { ProductInvoice } from '@app/core/models/invoice/product-invoice';
import { OrderDataService } from '../order-data.service';
import { OrderService } from '@app/core/api/order.service';
import * as moment from 'moment';
import { Product } from '@app/core/models/product';

@Component({
  selector: 'app-order-generator-po',
  templateUrl: './order-generator-po.component.html',
  styleUrls: ['./order-generator-po.component.scss']
})
export class OrderGeneratorPoComponent extends BaseValidationComponent implements OnInit {
  newOrder: Order;
  form: FormGroup;
  selectedProducts: any[];
  products: ProductInvoice[] = [];
  productsValid = true;

  constructor(private orderDataService: OrderDataService, private orderService: OrderService, private router: Router) {
    super();
  }

  ngOnInit() {
    this.orderDataService.currentForm.subscribe(form => {
      this.form = form;
    });
    this.formInput = this.form;
  }

  get order() {
    return this.form.controls;
  }

  get buyer() {
    return this.form.controls.buyer.value;
  }

  get seller() {
    return this.form.controls.seller.value;
  }

  get date_created() {
    return this.form.controls.date_created.value;
  }

  updateProducts($event: ProductInvoice[]) {
    this.products = $event;
  }

  updateForm($event: FormGroup) {
    this.form = $event;
  }

  checkProducts() {
    this.productsValid = false;
  }

  measurementUnitConflict(products: ProductInvoice[]): string {
    let baseMeasurementUnit: string;
    for (let i = 0; i < products.length; i++) {
      if (products[i].product_type === 'agricultural') {
        if (!baseMeasurementUnit) {
          baseMeasurementUnit = products[i].weight_unit;
        } else {
          if (baseMeasurementUnit !== products[i].weight_unit) {
            return undefined;
          }
        }
      }
    }
    return baseMeasurementUnit;
  }

  draftOrder() {
    this.order['sign_by'].patchValue({
      date: moment(this.form['controls'].sign_by['controls'].date.value)
        .subtract(1, 'months')
        .toJSON()
    });
    this.order['deliver_to'].patchValue({
      expected_delivery_date: moment(this.form['controls'].deliver_to['controls'].expected_delivery_date.value)
        .subtract(1, 'months')
        .toJSON()
    });
    this.form.patchValue({
      date_created: moment(this.form['controls'].date_created.value)
        .subtract(1, 'months')
        .toJSON()
    });
    this.newOrder = this.form.value;
    this.newOrder.products = this.products;
    this.newOrder.document_weight_unit = this.measurementUnitConflict(this.products);
    this.newOrder.total_due = this.order.subtotal.value;
    this.newOrder.draft = true;
    this.orderService.draft(this.newOrder).subscribe(() => {
      this.router.navigateByUrl('/order/list');
    });
  }

  toReview() {
    this.order['sign_by'].patchValue({
      date: moment(this.form['controls'].sign_by['controls'].date.value)
        .subtract(1, 'months')
        .toJSON()
    });
    this.order['deliver_to'].patchValue({
      expected_delivery_date: moment(this.form['controls'].deliver_to['controls'].expected_delivery_date.value)
        .subtract(1, 'months')
        .toJSON()
    });
    this.form.patchValue({
      date_created: moment(this.form['controls'].date_created.value)
        .subtract(1, 'months')
        .toJSON()
    });
    this.newOrder = this.form.value;
    this.newOrder.products = this.products;
    this.newOrder.document_weight_unit = this.measurementUnitConflict(this.products);
    this.newOrder.total_due = this.order.subtotal.value;
    this.orderDataService.setNewOrder(this.newOrder);
  }
}
