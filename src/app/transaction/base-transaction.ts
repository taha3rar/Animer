import { Transaction } from '@app/core/models/transaction';
import { QuoteRequest } from '@app/core/models/transaction/quote-request/quote-request';
import { Input, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core';

export class BaseTransaction implements OnInit {
  @Input()
  transaction: Transaction;
  @Input()
  quoteRequest: QuoteRequest;

  poGenerated: string;
  piGenerated: string;
  seller = false;

  constructor(protected authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.poGenerated = this.transaction.purchase_order_id;
    this.piGenerated = this.transaction.proforma_invoice_id;
    this.seller = this.authenticationService.currentUserId === this.transaction.seller._id;
  }
}
