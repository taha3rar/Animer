import { AlertsService } from './../../../core/alerts.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '@app/core/models/order/order';
import { ProductInvoice } from '@app/core/models/invoice/product-invoice';
import { OrderDataService } from '../order-data.service';
import { OrderService } from '@app/core/api/order.service';
import { DocumentGeneratorComponent } from '@app/shared/components/document-generator/document-generator.component';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-order-generator-po',
  templateUrl: './order-generator-po.component.html',
  styleUrls: ['./order-generator-po.component.scss']
})
export class OrderGeneratorPoComponent extends DocumentGeneratorComponent implements OnInit {
  newOrder: Order;
  selectedProducts: any[];
  currency: string;
  products: ProductInvoice[] = [];
  productsValid = true;
  @Output() newDraftPO = new EventEmitter();

  constructor(
    public orderDataService: OrderDataService,
    public dialog: MatDialog,
    private orderService: OrderService,
    private router: Router,
    private alerts: AlertsService
  ) {
    super(dialog, orderDataService);
  }

  ngOnInit() {
    this.orderDataService.currentForm.subscribe(form => {
      this.form = form;
      this.currency = this.form.value.currency;
    });
    this.orderDataService.currentProductList.subscribe(data => {
      if (data) {
        this.products = data;
      }
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
    this.newDraftPO.emit(true);
    this.newOrder = this.form.value;
    this.newOrder.products = this.products;
    this.newOrder.document_weight_unit = this.measurementUnitConflict(this.products);
    this.newOrder.total_due = this.order.subtotal.value;
    this.newOrder.draft = true;
    this.orderService.draft(this.newOrder).subscribe(() => {
      this.alerts.showAlert('Your purchase order has been saved as a draft!');
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
