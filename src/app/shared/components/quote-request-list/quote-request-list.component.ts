import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { AuthenticationService, QuoteRequestService } from '@app/core';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';
import { BaseListComponent } from '../base-list/base-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quote-request-list',
  templateUrl: './quote-request-list.component.html',
  styleUrls: ['./quote-request-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuoteRequestListComponent extends BaseListComponent implements OnInit {
  @Input() quoteRequests: QuoteRequest[];
  isBuyer: Boolean;
  page = 1;
  userId: String;
  qrReceived = 'QUOTE REQUEST RECEIVED';
  qrSent = 'QUOTE REQUEST SENT';
  qSent = 'QUOTATION SENT';
  qReceived = 'QUOTATION RECEIVED';
  qAccepted = 'QUOTATION ACCEPTED';
  oReceived = 'ORDER RECEIVED';

  constructor(
    protected authService: AuthenticationService,
    private quoteRequestService: QuoteRequestService,
    protected router: Router
  ) {
    super(quoteRequestService, router, {
      deleteText: 'Once deleted, you will not be able to recover this Quote Request!'
    });
  }

  ngOnInit() {
    this.authService.isSeller ? (this.isBuyer = false) : (this.isBuyer = true);
    this.userId = this.authService.currentUserId;
  }

  quotationSent(quoteRequest: QuoteRequest) {
    const qStatus = quoteRequest.status;
    return (
      qStatus === this.qSent || qStatus === this.qReceived || qStatus === this.qAccepted || qStatus === this.oReceived
    );
  }

  participants(index: number): string {
    let list = '';

    this.quoteRequests[index].sellers.forEach((seller: any) => {
      list += '• ' + seller.first_name + ' ' + seller.last_name + '\n';
    });

    return list;
  }
}
