import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core';
import { ActivatedRoute } from '@angular/router';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';
import { tooltips } from '@app/shared/helpers/tooltips/tootltips';

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
  tooltips = tooltips.quote_request;
  sellerQRs: QuoteRequest[];
  buyerQRs: QuoteRequest[];
  viewAsSeller = false;
  viewAsBuyer = false;
  isAgribusiness: boolean;

  constructor(private authService: AuthenticationService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.authService.isSeller ? (this.isBuyer = false) : (this.isBuyer = true);
    this.isAgribusiness = this.authService.isAgribusiness;
    this.route.data.subscribe(({ quoteRequests, quoteRequestsAsSeller, quoteRequestsAsBuyer }) => {
      this.hasQuoteRequests = quoteRequests.length > 0;
      this.quoteRequests = quoteRequests;
      this.sellerQRs = quoteRequestsAsSeller;
      this.buyerQRs = quoteRequestsAsBuyer;
    });
    if (this.isBuyer || (this.isAgribusiness && this.buyerQRs.length > 0)) {
      this.viewAs('buyer');
    } else {
      this.viewAs('seller');
    }
  }

  viewAs(profileType: any) {
    this.viewAsSeller = false;
    this.viewAsBuyer = false;
    if (profileType === 'seller') {
      this.quoteRequests = this.sellerQRs;
      this.viewAsSeller = true;
    } else {
      this.quoteRequests = this.buyerQRs;
      this.viewAsBuyer = true;
    }
  }
}
