import { Injectable } from '@angular/core';
import { AuthenticationService, OrderService, TransactionService } from '@app/core';
import { Resolve } from '@angular/router';
import { Counter } from '../models/counter';
import { Transaction } from '@app/core/models/transaction';
import { Order } from '@app/core/models/order/order';

@Injectable()
export class DashboardCounterResolver implements Resolve<Counter> {
  constructor(
    private authService: AuthenticationService,
    private orderService: OrderService,
    private transactionService: TransactionService
  ) {}

  resolve(): Counter {
    const currentUserId = this.authService.currentUserId;
    const counter: Counter = new Counter();

    this.transactionService.getByUser(currentUserId).subscribe((transactions: Transaction[]) => {
      counter.quote_requests = transactions.filter(t => t.quote_request_id).length;
      counter.proforma_invoices = transactions.filter(t => t.proforma_invoice_id).length;
      counter.purchase_orders = transactions.filter(t => t.purchase_order_id).length;
    });

    this.orderService.getByUser(currentUserId).subscribe((orders: Order[]) => {
      counter.orders = orders.length;
    });

    return counter;
  }
}
