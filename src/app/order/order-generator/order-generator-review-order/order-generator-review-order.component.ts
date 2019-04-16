import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDataService } from '../order-data.service';
import { OrderService } from '@app/core/api/order.service';
import { Order } from '@app/core/models/order/order';
import { AlertsService } from '@app/core/alerts.service';

@Component({
  selector: 'app-order-generator-review-order',
  templateUrl: './order-generator-review-order.component.html',
  styleUrls: ['./order-generator-review-order.component.scss']
})
export class OrderGeneratorReviewOrderComponent implements OnInit {
  order: Order;
  @Output() formSubmitted = new EventEmitter();
  constructor(
    private orderDataService: OrderDataService,
    private orderService: OrderService,
    private router: Router,
    private alerts: AlertsService
  ) {}

  ngOnInit() {
    this.orderDataService.newOrder.subscribe(order => {
      if (order) {
        this.order = order;
      }
    });
  }

  saveOrder(): void {
    this.formSubmitted.emit(true);
    this.orderService.create(this.order).subscribe((order: Order) => {
      this.alerts.showAlert('Your purchase order has been sent');
      this.router.navigateByUrl('/order/list');
    });
  }
}
