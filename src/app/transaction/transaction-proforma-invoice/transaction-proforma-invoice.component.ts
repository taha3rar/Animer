import { QuoteRequest } from './../../core/models/transaction/qr';
import { ActivatedRoute } from '@angular/router';
import { ProformaInvoice } from '@app/core/models/transaction/pi';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-proforma-invoice',
  templateUrl: './transaction-proforma-invoice.component.html',
  styleUrls: ['./transaction-proforma-invoice.component.scss']
})
export class TransactionProformaInvoiceComponent implements OnInit {

  proformaInvoice: ProformaInvoice = new ProformaInvoice();
  quoteRequest: QuoteRequest = new QuoteRequest();

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.proformaInvoice = this.route.snapshot.data['proformaInvoice'];
    this.quoteRequest = this.route.snapshot.data['quoteRequest'];
  }
}
