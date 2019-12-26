import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core';
import { ActivatedRoute } from '@angular/router';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';

@Component({
  selector: 'app-quote-requests-list',
  templateUrl: './quote-requests-list.component.html',
  styleUrls: ['./quote-requests-list.component.scss']
})
export class QuoteRequestsListComponent implements OnInit {
  isBuyer: Boolean;
  quoteRequests: QuoteRequest[];
  searchTerm: string;
  hasQuoteRequests: boolean;

  constructor(private authService: AuthenticationService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.authService.isSeller ? (this.isBuyer = false) : (this.isBuyer = true);
    this.route.data.subscribe(({ quoteRequests }) => {
      quoteRequests.lenght > 0 ? (this.hasQuoteRequests = true) : (this.hasQuoteRequests = false);
      this.quoteRequests = quoteRequests;
    });
  }
}
