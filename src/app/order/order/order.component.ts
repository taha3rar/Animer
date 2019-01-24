import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Order } from '@app/core/models/order/order';
import { Invoice } from '@app/core/models/invoice/invoice';
import { InvoiceService } from '@app/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  order: Order;
  invoice: Invoice;

  constructor(private location: Location, private route: ActivatedRoute, private invoiceService: InvoiceService) {}

  ngOnInit() {
    this.order = this.route.snapshot.data['order'];
    if (this.order.invoice) {
      this.invoiceService.get(this.order.invoice._id).subscribe(invoice => {
        this.invoice = invoice;
      });
    }
  }

  back() {
    this.location.back();
  }
}
