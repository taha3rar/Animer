import { Component, OnInit, Input } from '@angular/core';
import { Invoice } from '@app/core/models/order/invoice';

@Component({
  selector: 'app-invoice-generator-invoice',
  templateUrl: './invoice-generator-invoice.component.html',
  styleUrls: ['./invoice-generator-invoice.component.scss']
})
export class InvoiceGeneratorInvoiceComponent implements OnInit {
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
