import { Component, OnInit } from '@angular/core';
import { BaseTransaction } from '@app/transaction/base-transaction';
import { AuthenticationService, ProformaInvoiceService } from '@app/core';
import { ProformaInvoice } from '@app/core/models/transaction/proforma-invoice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-proforma-invoice-seller',
  templateUrl: './transaction-proforma-invoice-seller.component.html',
  styleUrls: ['./transaction-proforma-invoice-seller.component.scss']
})
export class TransactionProformaInvoiceSellerComponent extends BaseTransaction implements OnInit {
  piReady: boolean;
  constructor(
    protected authenticationService: AuthenticationService,
    private proformaInvoiceService: ProformaInvoiceService,
    private router: Router
  ) {
    super(authenticationService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (!this.proformaInvoice) {
      this.proformaInvoice = new ProformaInvoice(this.quoteRequest);
    }
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
