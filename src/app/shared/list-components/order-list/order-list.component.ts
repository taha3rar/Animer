import { Component, OnInit, Input } from '@angular/core';
import { Order } from '@app/core/models/order/order';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/core';
import swal from 'sweetalert';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  @Input()
  orders: Order[];
  page = 1;

  constructor(private route: ActivatedRoute, private authService: AuthenticationService) {}

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

  warning() {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this order!',
      icon: 'warning'
    });
  }
}
