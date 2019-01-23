import { AuthenticationService, ProformaInvoiceService } from '@app/core';
import { BaseTransaction } from '../base-transaction';
import { OnInit } from '@angular/core';
import { ProformaInvoice } from '@app/core/models/transaction/proforma-invoice';

export class BaseProformaInvoice extends BaseTransaction implements OnInit {
  proformaInvoice = new ProformaInvoice();

  constructor(protected authService: AuthenticationService, protected proformaInvoiceService: ProformaInvoiceService) {
    super(authService);
  }

  ngOnInit() {
    super.ngOnInit();

    if (this.transaction.proforma_invoice_id) {
      this.proformaInvoiceService.get(this.transaction.proforma_invoice_id).subscribe(proformaInvoice => {
        this.proformaInvoice = proformaInvoice;
      });
    } else {
      this.proformaInvoice = new ProformaInvoice(this.quoteRequest);
    }
  }
}
