import { Component } from '@angular/core';
import { AuthenticationService, ProformaInvoiceService } from '@app/core';
import { Router } from '@angular/router';
import { BaseProformaInvoice } from '../base-proforma-invoice';

@Component({
  selector: 'app-transaction-proforma-invoice-seller',
  templateUrl: './transaction-proforma-invoice-seller.component.html',
  styleUrls: ['./transaction-proforma-invoice-seller.component.scss']
})
export class TransactionProformaInvoiceSellerComponent extends BaseProformaInvoice {
  piReady: boolean;

  constructor(
    protected authenticationService: AuthenticationService,
    protected proformaInvoiceService: ProformaInvoiceService,
    private router: Router
  ) {
    super(authenticationService, proformaInvoiceService);
  }

  enableSubmission($event: boolean) {
    this.piReady = $event;
  }

  sendProformaInvoice() {
    this.proformaInvoiceService.create(this.proformaInvoice).subscribe(pi => {
      this.router.navigateByUrl('/transaction/list');
    });
  }
}
