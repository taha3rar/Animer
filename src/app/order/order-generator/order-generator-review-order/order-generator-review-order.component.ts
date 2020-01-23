import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDataService } from '../order-data.service';
import { OrderService } from '@app/core/api/order.service';
import { Order } from '@app/core/models/order/order';
import { AlertsService } from '@app/core/alerts.service';
import { BaseValidationComponent } from '@app/shared/components/base-validation/base-validation.component';
import { tooltips } from '@app/shared/helpers/tooltips/tootltips';

@Component({
  selector: 'app-order-generator-review-order',
  templateUrl: './order-generator-review-order.component.html',
  styleUrls: ['./order-generator-review-order.component.scss']
})
export class OrderGeneratorReviewOrderComponent extends BaseValidationComponent implements OnInit {
  tooltips = tooltips.orders.order_generator;
  order: Order;
  @Input()
  openOrder: boolean;
  @Output() formSubmitted = new EventEmitter();

  constructor(
    private orderDataService: OrderDataService,
    private orderService: OrderService,
    private router: Router,
    private alerts: AlertsService
  ) {
    super();
  }

  ngOnInit() {
    this.orderDataService.newOrder.subscribe(order => {
      if (order) {
        this.order = order;
      }
    });
  }

  saveOrder(): void {
    this.disableSubmitButton(true);
    this.formSubmitted.emit(true);
    if (this.openOrder) {
      this.orderService.createOpen(this.order).subscribe(
        (order: Order) => {
          this.alerts.showAlert('Your purchase order has been sent');
          this.router.navigateByUrl('/order');
        },
        err => {
          this.disableSubmitButton(false);
          this.alerts.showAlertDanger(err.error.message);
        }
      );
    } else {
      this.orderService.create(this.order).subscribe(
        (order: Order) => {
          this.alerts.showAlert('Your purchase order has been sent');
          this.router.navigateByUrl('/order');
        },
        err => {
          this.disableSubmitButton(false);
        }
      );
    }
  }

  sellerContactSms(): boolean {
    if (this.order) {
      return this.order.seller.contact_by.includes('sms');
    } else {
      return false;
    }
  }

  sellerContactEmail(): boolean {
    if (this.order) {
      return this.order.seller.contact_by.includes('email');
    } else {
      return false;
    }
  }
}
