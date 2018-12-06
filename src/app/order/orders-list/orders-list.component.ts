import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '@app/core/models/order/order';
import { AuthenticationService } from '@app/core';

@Pipe({ name: 'roundUp' })
export class RoundUpPipe implements PipeTransform {
  transform(input: number) {
    return Math.ceil(input);
  }
}

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  orders: Order[];

  constructor(private route: ActivatedRoute, private authService: AuthenticationService) {}

  ngOnInit() {
    this.route.data.subscribe(({ orders }) => {
      this.orders = orders;
    });
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
}
