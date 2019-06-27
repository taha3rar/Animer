import { Component, OnInit, Input, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Quotation } from '@app/core/models/quotation/quotation';
import { QuotationService } from '@app/core';
import { AlertsService } from '@app/core/alerts.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { DocumentDownloadComponent } from '@app/shared/components/document-download/document-download.component';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html'
})
export class QuotationComponent extends DocumentDownloadComponent implements OnInit {
  @Input() quotation: Quotation;
  @Input() isGenerator = false;
  @Input() isView = false;
  isModal = false;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    @Optional() public dialogRef: MatDialogRef<QuotationComponent>,
    private quotationService: QuotationService,
    private alerts: AlertsService,
    private router: Router
  ) {
    super(quotationService, 'quotation', 'Quotation');
  }

  ngOnInit() {
    if (this.data) {
      this.isModal = true;
      this.quotation = this.data.quotation;
    }
    console.log(this.quotation);
    this.transaction = this.quotation;
    super.setTransaction(this.quotation);
  }

  submitQuotation() {
    this.quotationService.create(this.quotation).subscribe(quotation => {
      this.alerts.showAlert('Your quotation has been sent');
      this.router.navigateByUrl('/quote-request/list');
    });
  }

  acceptQuotation() {
    this.quotationService.acceptQuotation(this.quotation._id).subscribe(data => {
      this.alerts.showAlert('The quotation has been successfully accepted');
      this.onExit(true);
    });
  }

  generatePurchaseOrder() {
    this.router.navigateByUrl(`/order/generator/quotation/${this.quotation._id}`);
    this.onExit(false);
  }

  isAccepted() {
    return this.quotation.status === 'QUOTATION ACCEPTED';
  }

  orderGenerated() {
    return this.quotation.status === 'ORDER SENT';
  }

  onExit(refresh?: boolean): void {
    if (refresh) {
      this.dialogRef.close({
        refresh: true
      });
    } else {
      this.dialogRef.close();
    }
  }
}
