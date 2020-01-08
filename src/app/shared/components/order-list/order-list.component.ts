import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Order } from '@app/core/models/order/order';
import { AuthenticationService, OrderService } from '@app/core';
import { BaseListComponent } from '../base-list/base-list.component';
import { Router } from '@angular/router';
import 'hammerjs';
import { Sort } from '@angular/material/sort';
import { tooltips } from '@app/shared/helpers/tooltips/tootltips';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})

export class OrderListComponent extends BaseListComponent implements OnInit, OnChanges {
  @Input()
  orders: Order[];
  @Input()
  searchTerm: string;
  @Input()
  viewAsSeller: boolean;
  hasOrders: boolean;
  tooltips = tooltips.orders.orders_list;
  // tslint:disable-next-line:max-line-length
  usersWhiteList = [
    'bendemoseller@gmail.com',
    'ishai@avenews-gt.com',
    'javier@avenews-gt.com',
    'marcus.mika@gmail.com',
    'mcsmicha@gmail.com',
    'michael@avenews-gt.com'
  ];
  processedProductConflictMessage: String =
    // tslint:disable-next-line:max-line-length
    'This purchase order includes only processed products, for more information please click on the blue VIEW button on the right side of the row';
  measurementUnitConflictMessage: String =
    // tslint:disable-next-line:max-line-length
    'This purchase order includes products with more than one measurement unit, for more information please click on the blue VIEW button on the right side of the row';

  constructor(
    protected authService: AuthenticationService,
    private orderService: OrderService,
    protected router: Router
  ) {
    super(orderService, router, {
      deleteText: 'Once deleted, you will not be able to recover this order!',
      pageName: 'orders'
    });
  }

  ngOnInit() {
    this.orders = this.orders.slice();
  }

  ngOnChanges() {
    this.hasOrders = this.orders.length > 0;
  }

  sortData(sort: Sort) {
    const data = this.orders.slice();
    if (!sort.active || sort.direction === '') {
      this.orders = data;
      return;
    }

    this.orders = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return super.compare(a.numericId, b.numericId, isAsc);
        case 'date':
          return super.compare(a.date_created, b.date_created, isAsc);
        case 'company': {
          if (this.userId === a.seller._id) {
            return super.compare(a.buyer.company_name, b.buyer.company_name, isAsc);
          } else {
            return super.compare(a.seller.company_name, b.seller.company_name, isAsc);
          }
        }
        case 'contact': {
          if (this.userId === a.seller._id) {
            return super.compare(a.buyer.first_name + a.buyer.last_name, b.buyer.first_name + b.buyer.last_name, isAsc);
          } else {
            return super.compare(
              a.seller.first_name + a.seller.last_name,
              b.seller.first_name + b.seller.last_name,
              isAsc
            );
          }
        }
        case 'amount':
          return super.compare(a.total_weight, b.total_weight, isAsc);
        case 'price':
          return super.compare(this.totalDue(a), this.totalDue(b), isAsc);
        case 'status':
          return super.compare(a.status, b.status, isAsc);
        default:
          return 0;
      }
    });
  }

  get canDelete() {
    // delete ability is only allowed for specific users
    return this.usersWhiteList.includes(this.authService.credentials.user.email);
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

  // totalDue to be displayed
  // If the invoice is saved the invoice total_due is displayed to the seller
  // If the invoice is geenrated the invoice total_due is displayed to the seller AND the buyer
  // Otherwise, the order total_due is displayed
  totalDue(order: Order): number {
    if (order.invoice && order.invoice.total_due) {
      if (!order.invoice.draft || order.seller._id === this.userId) {
        return order.invoice.total_due;
      } else {
        return order.total_due;
      }
    } else {
      return order.total_due;
    }
  }
}
