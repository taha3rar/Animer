import { Component } from '@angular/core';
import { BaseTransaction } from '../../base-transaction';
import { AuthenticationService } from '@app/core';

export class PurchaseOrderSpecificFields {
  payment_terms: string;
  terms_conditions: string;
  valid_until: string;
}

@Component({
  selector: 'app-transaction-buyer',
  templateUrl: './transaction-buyer.component.html',
  styleUrls: ['./transaction-buyer.component.scss']
})
export class TransactionBuyerComponent extends BaseTransaction {
  purchaseOrderSpecificFields = new PurchaseOrderSpecificFields();
  constructor(protected authenticationService: AuthenticationService) {
    super(authenticationService);
  }
}
