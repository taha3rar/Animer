import { ProformaInvoice } from '@app/core/models/transaction/proforma-invoice';
import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from '@app/core/models/transaction';
import { AuthenticationService } from '@app/core';
import { QuoteRequest } from '@app/core/models/transaction/quote-request/quote-request';

@Component({
  selector: 'app-transaction-proforma-invoice',
  templateUrl: './transaction-proforma-invoice.component.html',
  styleUrls: ['./transaction-proforma-invoice.component.scss']
})
export class TransactionProformaInvoiceComponent implements OnInit {
  @Input()
  proformaInvoice: ProformaInvoice;
  @Input()
  transaction: Transaction;
  @Input()
  quoteRequest: QuoteRequest;
  isSeller = false;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    const currentUserId = this.authService.currentUserId;

    // Check if this is a seller
    if (currentUserId === this.transaction.seller_id) {
      this.isSeller = true;
    }
    // Populate empty pi for seller
    if (!this.proformaInvoice && this.isSeller) {
      this.proformaInvoice = new ProformaInvoice(this.quoteRequest);
    } else {
      this.proformaInvoice = new ProformaInvoice();
    }
  }
}
