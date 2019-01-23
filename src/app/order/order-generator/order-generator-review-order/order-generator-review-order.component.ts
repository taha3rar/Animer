import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDataService } from '../order-data.service';
import { OrderService } from '@app/core/api/order.service';
import { Order } from '@app/core/models/order/order';
import * as jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-order-generator-review-order',
  templateUrl: './order-generator-review-order.component.html',
  styleUrls: ['./order-generator-review-order.component.scss']
})
export class OrderGeneratorReviewOrderComponent implements OnInit {
  order: Order;

  constructor(private orderDataService: OrderDataService, private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.orderDataService.newOrder.subscribe(order => {
      if (order) {
        this.order = order;
        console.log(this.order);
      }
    });
  }

  download(): void {
    html2canvas(document.getElementById('pdfContent'), { windowWidth: 900, windowHeight: 1000 }).then(canvas => {
      const pdf = new jspdf('p', 'mm', 'a4');
      const img = canvas.toDataURL('image/png');
      pdf.addImage(img, 'PNG', 0, 0, 208, 300);
      pdf.save(`invoice-${this.order.numericId}.pdf`);
    });
  }

  saveOrder(): void {
    this.orderService.create(this.order).subscribe((order: Order) => {
      this.router.navigateByUrl('/order/list');
    });
  }
}
