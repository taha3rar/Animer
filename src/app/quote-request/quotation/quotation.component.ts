import { Component, OnInit, Input, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Quotation } from '@app/core/models/quotation/quotation';
import { QuotationService } from '@app/core';
import { AlertsService } from '@app/core/alerts.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html'
})
export class QuotationComponent implements OnInit {
  @Input() quotation: Quotation;
  @Input() isGenerator = false;
  @Input() isView = false;
  isModal = false;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private quotationService: QuotationService,
    private alerts: AlertsService,
    private router: Router,
    @Optional() public dialogRef: MatDialogRef<QuotationComponent>
  ) {}

  ngOnInit() {
    if (this.data) {
      this.isModal = true;
      this.quotation = this.data.quotation;
    }
  }

  submitQuotation() {
    this.quotationService.create(this.quotation).subscribe(quotation => {
      this.alerts.showAlert('Your quotation has been sent');
      this.router.navigateByUrl('/quote-request/list');
    });
  }

  downloadPopup() {
    swal({
      title: 'Download as PDF',
      className: 'swal-pdf',
      text: 'Please choose the type of quotation document you would like to download:',
      buttons: {
        originalDoc: { text: 'Original Document', value: 'original', className: 'swal-button-o', closeModal: false },
        copyDoc: { text: 'Copy Document', value: 'copy', closeModal: false }
      }
    }).then(value => {
      if (value === 'original') {
      } else {
      }
    });
  }

  acceptQuotation() {
    this.quotationService.acceptQuotation(this.quotation._id).subscribe(data => {
      this.alerts.showAlert('The quotation has been successfully accepted');
      this.onExit(true);
    });
  }

  isAccepted() {
    return this.quotation.status === 'QUOTATION ACCEPTED';
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
