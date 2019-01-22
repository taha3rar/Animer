import { ProformaInvoice } from '@app/core/models/transaction/proforma-invoice';
import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '@app/core';
import { BaseTransaction } from '../base-transaction';

@Component({
  selector: 'app-transaction-proforma-invoice',
  templateUrl: './transaction-proforma-invoice.component.html',
  styleUrls: ['./transaction-proforma-invoice.component.scss']
})
export class TransactionProformaInvoiceComponent extends BaseTransaction implements OnInit {
  constructor(private authService: AuthenticationService) {
    super(authService);
  }

  ngOnInit() {
    super.ngOnInit();

    if (!this.proformaInvoice) {
      this.proformaInvoice = new ProformaInvoice();
    }
  }
}
