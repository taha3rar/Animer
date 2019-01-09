import { Component, OnInit, Input } from '@angular/core';
import { Invoice } from '@app/core/models/order/invoice';

@Component({
  selector: 'app-order-invoice-generator',
  templateUrl: './order-invoice-generator.component.html',
  styleUrls: ['./order-invoice-generator.component.scss']
})
export class OrderInvoiceGeneratorComponent implements OnInit {
  @Input()
  invoice: Invoice;

  constructor() {}

  ngOnInit() {}

  get issuer() {
    return this.invoice.seller;
  }

  get buyer() {
    return this.invoice.buyer;
  }
}
