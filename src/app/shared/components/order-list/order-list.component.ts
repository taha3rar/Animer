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
  // tslint:disable-next-line:max-line-length
  processedProductConflictMessage: String =
    'This purchase order includes only processed products, for more information please click on the blue VIEW button on the right side of the row';
  // tslint:disable-next-line:max-line-length
  measurementUnitConflictMessage: String =
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

  ngOnInit() {}

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
}
