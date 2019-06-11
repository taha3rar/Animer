import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { QuoteRequestDataService } from '../quote-request-generator/quote-request-data.service';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';
import { QuoteRequestService } from '@app/core/api/quote-request.service';
import { AlertsService } from '@app/core/alerts.service';
import { Router } from '@angular/router';
import { ProductQuoteRequest } from '@app/core/models/quote-request/product-quoteRequest';
import swal from 'sweetalert';

@Component({
  selector: 'app-quote-request',
  templateUrl: './quote-request.component.html',
  styleUrls: ['./quote-request.component.scss']
})
export class QuoteRequestComponent implements OnInit {
  @Output() validQuoteRequest = new EventEmitter<Boolean>();
  @Input() isGenerator = false;
  @Input() quoteRequest: QuoteRequest;
  @Input() isSeller = false;
  page = 1;
  product: ProductQuoteRequest;

  constructor(
    private quoteRequestDataService: QuoteRequestDataService,
    private quoteRequestService: QuoteRequestService,
    private alerts: AlertsService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.isGenerator) {
      this.quoteRequestDataService.currentQuoteRequest.subscribe(quoteRequest => {
        this.quoteRequest = quoteRequest;
        this.product = this.quoteRequest.product;
      });
    } else {
      this.product = this.quoteRequest.product;
    }
  }

  downloadPopup() {
    swal({
      title: 'Download as PDF',
      className: 'swal-pdf',
      text: 'Please choose the type of quote request document you would like to download:',
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

  submitQuoteRequest() {
    this.validQuoteRequest.emit(true);
    this.quoteRequestService.create(this.quoteRequest).subscribe(quoteRequest => {
      this.alerts.showAlert('Your quote request has been sent');
      this.router.navigateByUrl('/quote-request/list');
    });
  }
}
