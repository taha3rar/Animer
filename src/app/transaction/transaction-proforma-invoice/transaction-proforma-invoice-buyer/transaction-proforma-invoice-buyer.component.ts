import { Component } from '@angular/core';
import { BaseTransaction } from '@app/transaction/base-transaction';
import { AuthenticationService } from '@app/core';

@Component({
  selector: 'app-transaction-proforma-invoice-buyer',
  templateUrl: './transaction-proforma-invoice-buyer.component.html',
  styleUrls: ['./transaction-proforma-invoice-buyer.component.scss']
})
export class TransactionProformaInvoiceBuyerComponent extends BaseTransaction {
  constructor(protected authenticationService: AuthenticationService) {
    super(authenticationService);
  }
}
