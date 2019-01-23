import { Component } from '@angular/core';
import { AuthenticationService, ProformaInvoiceService } from '@app/core';
import { BaseProformaInvoice } from '../base-proforma-invoice';

@Component({
  selector: 'app-transaction-proforma-invoice-buyer',
  templateUrl: './transaction-proforma-invoice-buyer.component.html',
  styleUrls: ['./transaction-proforma-invoice-buyer.component.scss']
})
export class TransactionProformaInvoiceBuyerComponent extends BaseProformaInvoice {
  constructor(
    protected authenticationService: AuthenticationService,
    protected proformaInvoiceService: ProformaInvoiceService
  ) {
    super(authenticationService, proformaInvoiceService);
  }

  get canGeneratePO() {
    return this.proformaInvoice && this.proformaInvoice._id && !this.transaction.purchase_order_id;
  }
}
