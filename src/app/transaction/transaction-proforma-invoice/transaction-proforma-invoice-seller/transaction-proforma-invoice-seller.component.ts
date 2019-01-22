import { Component, OnInit } from '@angular/core';
import { BaseTransaction } from '@app/transaction/base-transaction';
import { AuthenticationService } from '@app/core';
import { ProformaInvoice } from '@app/core/models/transaction/proforma-invoice';

@Component({
  selector: 'app-transaction-proforma-invoice-seller',
  templateUrl: './transaction-proforma-invoice-seller.component.html',
  styleUrls: ['./transaction-proforma-invoice-seller.component.scss']
})
export class TransactionProformaInvoiceSellerComponent extends BaseTransaction implements OnInit {
  constructor(protected authenticationService: AuthenticationService) {
    super(authenticationService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.proformaInvoice) {
      this.proformaInvoice = new ProformaInvoice(this.quoteRequest);
    }
  }

  sendProformaInvoice() {
    console.log(this.proformaInvoice);
  }
}
