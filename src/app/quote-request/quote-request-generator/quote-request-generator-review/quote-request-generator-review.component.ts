import { Component, OnInit } from '@angular/core';
import { QuoteRequestDataService } from '../quote-request-data.service';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';
import { QuoteRequestService } from '@app/core/api/quote-request.service';
import { AlertsService } from '@app/core/alerts.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-quote-request-generator-review',
  templateUrl: './quote-request-generator-review.component.html',
  styleUrls: ['./quote-request-generator-review.component.scss']
})
export class QuoteRequestGeneratorReviewComponent implements OnInit {
  quoteRequest: QuoteRequest;
  page = 1;

  constructor(
    private quoteRequestDataService: QuoteRequestDataService,
    private quoteRequestService: QuoteRequestService,
    private alerts: AlertsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.quoteRequestDataService.currentQuoteRequest.subscribe(quoteRequest => {
      this.quoteRequest = quoteRequest;
      this.quoteRequest.valid_by = moment(this.quoteRequest.valid_by)
        .subtract(1, 'months')
        .toJSON();
      this.quoteRequest.date_created = moment(this.quoteRequest.date_created).toJSON();
    });
  }

  submitQuoteRequest() {
    this.quoteRequestService.create(this.quoteRequest).subscribe(quoteRequest => {
      this.alerts.showAlert('Your quote request has been sent');
      this.router.navigateByUrl('/quote-request/list');
    });
  }
}
