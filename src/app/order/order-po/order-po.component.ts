import { Component, OnInit, Input } from '@angular/core';
import { Order } from '@app/core/models/order/order';
import * as jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';
import { AuthenticationService } from '@app/core';

@Component({
  selector: 'app-order-po',
  templateUrl: './order-po.component.html',
  styleUrls: ['./order-po.component.scss']
})
export class OrderPoComponent implements OnInit {
  user_id: string;
  buyer: boolean;
  @Input()
  order: Order;
  @Input()
  generateOrder: boolean;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.buyer = false;
    this.user_id = this.authService.currentUserId;
    if (this.order && this.user_id === this.order.buyer._id) {
      this.buyer = true;
    }
  }

  download(): void {
    html2canvas(document.getElementById('pdfContent'), { windowWidth: 900, windowHeight: 1000 }).then(canvas => {
      const pdf = new jspdf('p', 'mm', 'a4');
      const img = canvas.toDataURL('image/png');
      pdf.addImage(img, 'PNG', 0, 0, 208, 300);
      pdf.save(`invoice-${this.order.numericId}.pdf`);
    });
  }
}
