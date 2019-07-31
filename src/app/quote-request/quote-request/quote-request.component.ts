import { DocumentDownloadComponent } from './../../shared/components/document-download/document-download.component';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { QuoteRequestDataService } from '../quote-request-generator/quote-request-data.service';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';
import { QuoteRequestService } from '@app/core/api/quote-request.service';
import { AlertsService } from '@app/core/alerts.service';
import { Router } from '@angular/router';
import { ProductQuoteRequest } from '@app/core/models/quote-request/product-quoteRequest';
import { Quotation } from '@app/core/models/quotation/quotation';
import { User } from '@app/core/models/order/user';

@Component({
  selector: 'app-quote-request',
  templateUrl: './quote-request.component.html',
  styleUrls: ['./quote-request.component.scss']
})
export class QuoteRequestComponent extends DocumentDownloadComponent implements OnInit {
  @Output() validQuoteRequest = new EventEmitter<Boolean>();
  @Input() isGenerator = false;
  @Input() quoteRequest: QuoteRequest;
  @Input() isSeller = false;
  @Input() quotation: Quotation;
  @Input() seller: User;
  page = 1;
  product: ProductQuoteRequest;

  constructor(
    private quoteRequestDataService: QuoteRequestDataService,
    private quoteRequestService: QuoteRequestService,
    private alerts: AlertsService,
    private router: Router
  ) {
    super(quoteRequestService, 'quote-request', 'Quote Request');
  }

  ngOnInit() {
    if (this.isGenerator) {
      this.quoteRequestDataService.currentQuoteRequest.subscribe(quoteRequest => {
        this.quoteRequest = quoteRequest;
        this.product = this.quoteRequest.product;
      });
    } else {
      this.product = this.quoteRequest.product;
    }
    super.setTransaction(this.quoteRequest);
  }

  submitQuoteRequest() {
    this.disableSubmitButton(true);
    if (this.quoteRequest.product && this.quoteRequest.sellers.length > 0) {
      this.validQuoteRequest.emit(true);
      this.quoteRequestService.create(this.quoteRequest).subscribe(
        quoteRequest => {
          this.alerts.showAlert('Your quote request has been sent');
          this.router.navigateByUrl('/quote-request');
        },
        err => {
          this.disableSubmitButton(false);
        }
      );
    } else {
      this.alerts.showAlert('Please fill in all the necessary informations in order to send the Quotation');
    }
  }
}
