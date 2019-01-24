import { Component, OnInit, Input } from '@angular/core';
import { Order } from '@app/core/models/order/order';

@Component({
  selector: 'app-order-po',
  templateUrl: './order-po.component.html',
  styleUrls: ['./order-po.component.scss']
})
export class OrderPoComponent implements OnInit {
  @Input()
  order: Order;

  constructor() {}

  ngOnInit() {}
}
