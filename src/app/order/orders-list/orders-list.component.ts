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
  page = 1;
  viewAsSeller = false;
  viewAsBuyer = false;
  viewAsAgri = true;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(({ orders }) => {
      this.orders = orders;
    });
  }

  viewAs(profileType: any) {
    this.viewAsSeller = false;
    this.viewAsBuyer = false;
    this.viewAsAgri = false;
    if (profileType === 'seller') {
      this.viewAsSeller = true;
    } else if (profileType === 'buyer') {
      this.viewAsBuyer = true;
    } else {
      this.viewAsAgri = true;
    }
  }
}
