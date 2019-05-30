import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService, QuoteRequestService } from '@app/core';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';
import { BaseListComponent } from '../base-list/base-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quote-request-list',
  templateUrl: './quote-request-list.component.html',
  styleUrls: ['./quote-request-list.component.scss']
})
export class QuoteRequestListComponent extends BaseListComponent implements OnInit {
  @Input() quoteRequests: QuoteRequest[];
  isBuyer: Boolean;
  page = 1;
  userId: String;

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
}
