import { Component, OnInit, Input } from '@angular/core';
import { Order } from '@app/core/models/order/order';
import { AuthenticationService, OrderService } from '@app/core';
import { BaseListComponent } from '../base-list/base-list.component';
import { Router } from '@angular/router';
import 'hammerjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent extends BaseListComponent implements OnInit {
  @Input()
  orders: Order[];
  page = 1;
  processedProductConflictMessage: String =
    // tslint:disable-next-line:max-line-length
    'This purchase order includes only processed products, for more information please click on the blue VIEW button on the right side of the row';
  measurementUnitConflictMessage: String =
    // tslint:disable-next-line:max-line-length
    'This purchase order includes products with more than one measurement unit, for more information please click on the blue VIEW button on the right side of the row';

  constructor(
    private authService: AuthenticationService,
    private orderService: OrderService,
    protected router: Router
  ) {
    super(orderService, router, {
      deleteText: 'Once deleted, you will not be able to recover this order!'
    });
  }

  ngOnInit() {
    console.log(this.orders);
  }

  get userId() {
    return this.authService.currentUserId;
  }

  hasProcessedProduct(order: Order) {
    for (let i = 0; i < order.products.length; i++) {
      if (order.products[i].product_type === 'processed') {
        return true;
      }
    }
    return false;
  }

  totalDue(order: Order): Number {
    if (order.invoice) {
      if (order.invoice.draft && order.invoice.total_due && order.seller._id === this.userId) {
        return order.invoice.total_due;
      } else if (order.invoice.draft && order.invoice.total_due && order.buyer._id === this.userId) {
        return order.invoice.total_due;
      } else if (!order.invoice.draft && order.invoice.total_due) {
        return order.invoice.total_due;
      } else {
        return order.total_due;
      }
    } else {
      return order.total_due;
    }
  }
}
