import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '@app/core/models/order/order';
import { Invoice } from '@app/core/models/invoice/invoice';
import { InvoiceService } from '@app/core';
import { Document } from '@app/core/models/order/document';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  order: Order;
  invoice: Invoice;
  documents: Document[];

  constructor(private router: Router, private route: ActivatedRoute, private invoiceService: InvoiceService) {}

  ngOnInit() {
    this.route.data.subscribe(({ order, documents }) => {
      this.order = order;
      console.log(this.order);
      this.documents = documents;

      if (this.order.invoice && !this.order.invoice.draft) {
        this.invoiceService.get(this.order.invoice._id).subscribe(invoice => {
          this.invoice = invoice;
        });
      }
    });
  }

  back() {
    this.router.navigateByUrl('/order');
  }
}
