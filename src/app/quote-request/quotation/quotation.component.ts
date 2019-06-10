import { Component, OnInit, Input } from '@angular/core';
import { Quotation } from '@app/core/models/quotation/quotation';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';
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
  @Input() quoteRequest: QuoteRequest;
  @Input() isGenerator = false;
  quotationAccepted = false;

  constructor(private quotationService: QuotationService, private alerts: AlertsService, private router: Router) {}

  ngOnInit() {}

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
}
