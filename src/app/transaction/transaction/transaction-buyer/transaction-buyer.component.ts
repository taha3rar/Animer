import { Component } from '@angular/core';
import { BaseTransaction } from '../../base-transaction';
import { AuthenticationService } from '@app/core';

@Component({
  selector: 'app-transaction-buyer',
  templateUrl: './transaction-buyer.component.html',
  styleUrls: ['./transaction-buyer.component.scss']
})
export class TransactionBuyerComponent extends BaseTransaction {
  constructor(protected authenticationService: AuthenticationService) {
    super(authenticationService);
  }
}
