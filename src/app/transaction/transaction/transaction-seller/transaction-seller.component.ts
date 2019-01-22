import { Component } from '@angular/core';
import { BaseTransaction } from '../../base-transaction';
import { AuthenticationService } from '@app/core';

@Component({
  selector: 'app-transaction-seller',
  templateUrl: './transaction-seller.component.html',
  styleUrls: ['./transaction-seller.component.scss']
})
export class TransactionSellerComponent extends BaseTransaction {
  constructor(protected authenticationService: AuthenticationService) {
    super(authenticationService);
  }
}
