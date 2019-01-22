import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core';
import { BaseTransaction } from '../base-transaction';

@Component({
  selector: 'app-transaction-quote-request',
  templateUrl: './transaction-quote-request.component.html',
  styleUrls: ['./transaction-quote-request.component.scss']
})
export class TransactionQuoteRequestComponent extends BaseTransaction {
  constructor(protected authenticationService: AuthenticationService) {
    super(authenticationService);
  }
}
