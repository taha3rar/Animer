import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '@app/core/models/order/order';
import { AuthenticationService } from '@app/core';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  orders: Order[];
  allOrders: Order[];
  buyerOrders: Order[];
  sellerOrders: Order[];
  page = 1;
  viewAsSeller = false;
  viewAsBuyer = false;
  viewAsAgri = true;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(({ orders, ordersAsBuyer, ordersAsSeller }) => {
      this.orders = orders;
      this.allOrders = orders;
      this.buyerOrders = ordersAsBuyer;
      this.sellerOrders = ordersAsSeller;
    });
  }

  viewAs(profileType: any) {
    this.viewAsSeller = false;
    this.viewAsBuyer = false;
    this.viewAsAgri = false;
    if (profileType === 'seller') {
      this.orders = this.sellerOrders;
      this.viewAsSeller = true;
    } else if (profileType === 'buyer') {
      this.orders = this.buyerOrders;
      this.viewAsBuyer = true;
    } else {
      this.orders = this.allOrders;
      this.viewAsAgri = true;
    }
  }
}
