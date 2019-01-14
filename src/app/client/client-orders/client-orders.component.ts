import { Component, OnInit, Input } from '@angular/core';
import { Order } from '@app/core/models/order/order';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/core';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.scss']
})
export class ClientOrdersComponent implements OnInit {
  @Input()
  orders: Order[];
  page = 1;

  constructor(private route: ActivatedRoute, private authService: AuthenticationService) {}

  ngOnInit() {}

  hasProcessedProduct(order: Order) {
    for (let i = 0; i < order.products.length; i++) {
      if (order.products[i].product_type === 'processed') {
        return true;
      }
    }
    return false;
  }

  get userId() {
    return this.authService.currentUserId;
  }
}
