import { Component, Input } from '@angular/core';
import { AuthenticationService, ProformaInvoiceService } from '@app/core';
import { BaseTransaction } from '../base-transaction';
import { ProformaInvoice } from '@app/core/models/transaction/proforma-invoice';

@Component({
  selector: 'app-transaction-proforma-invoice',
  templateUrl: './transaction-proforma-invoice.component.html',
  styleUrls: ['./transaction-proforma-invoice.component.scss']
})
export class TransactionProformaInvoiceComponent extends BaseTransaction {
  // @Input()
  // generatePOEnabled: string;
  @Input()
  proformaInvoice: ProformaInvoice;

  constructor(private authService: AuthenticationService, private proformaInvoiceService: ProformaInvoiceService) {
    super(authService);
  }
}
