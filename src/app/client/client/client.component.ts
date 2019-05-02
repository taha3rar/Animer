import { Component, OnInit, ElementRef, ViewChildren } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { User } from '@app/core/models/user/user';
import { defaultValues } from '@app/shared/helpers/default_values';
import { Transaction } from '@app/core/models/transaction';
import { Invoice } from '@app/core/models/invoice/invoice';
import { Order } from '@app/core/models/order/order';

export class Counter {
  orders: number;
  documents: number;
  // transactions: number;
  invoices: number;
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  user: User;
  // transactions: Transaction[];
  invoices: Invoice[];
  orders: Order[];
  documents: any[];
  counter: Counter = new Counter();
  @ViewChildren('tabs')
  tabs: ElementRef;
  constructor(private location: Location, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(({ user, orders, invoices, documents }) => {
      this.user = user;
      // this.transactions = transactions;
      this.orders = orders;
      this.invoices = invoices;
      this.documents = documents;

      this.counter = {
        // transactions: this.transactions.length,
        orders: this.orders.length,
        documents: this.documents.length,
        invoices: this.invoices.length
      };
    });
  }

  product_image() {
    return this.user.personal_information.profile_picture || defaultValues.profile_picture;
  }

  back() {
    this.location.back();
  }
}
