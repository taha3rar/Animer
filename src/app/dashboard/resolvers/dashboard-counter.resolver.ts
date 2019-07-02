import { Injectable } from '@angular/core';
import { AuthenticationService, OrderService, InvoiceService, ProductService, UserService } from '@app/core';
import { Resolve } from '@angular/router';
import { Counter } from '../models/counter';
import { Order } from '@app/core/models/order/order';
import { Invoice } from '@app/core/models/invoice/invoice';
import { Client } from '@app/core/models/user/client';
import { Product } from '@app/core/models/product';

@Injectable()
export class DashboardCounterResolver implements Resolve<Counter> {
  constructor(
    private authService: AuthenticationService,
    private orderService: OrderService,
    private invoiceService: InvoiceService,
    private productService: ProductService,
    private userService: UserService
  ) {}

  resolve(): Counter {
    const currentUserId = this.authService.currentUserId;
    const counter: Counter = new Counter();

    this.orderService.getByUser(currentUserId).subscribe((orders: Order[]) => {
      counter.orders = orders.length;
    });

    this.invoiceService.getByUser(currentUserId).subscribe((invoices: Invoice[]) => {
      counter.invoices = invoices.length;
    });

    this.userService.getClientsByUser(currentUserId).subscribe((clients: Client[]) => {
      counter.clients = clients.length;
    });

    this.productService.getByUser(currentUserId).subscribe((products: Product[]) => {
      counter.products = products.length;
    });

    return counter;
  }
}
