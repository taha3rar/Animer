import { Quotation } from './../../core/models/quotation/quotation';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';

@Component({
  selector: 'app-quote-request-view',
  templateUrl: './quote-request-view.component.html',
  styleUrls: ['./quote-request-view.component.scss']
})
export class QuoteRequestViewComponent implements OnInit {
  quoteRequest: QuoteRequest;
  quotation: Quotation;
  quotations: Quotation[];
  acceptedQuotations: Quotation[];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.quotation = this.route.snapshot.data['quotation'];
    this.route.data.subscribe(({ quoteRequest, quotations, acceptedQuotations }) => {
      this.quoteRequest = quoteRequest;
      this.acceptedQuotations = acceptedQuotations;
      this.quotations = quotations.slice();
    });
  }

  back() {
    this.router.navigateByUrl('/quote-request/list');
  }
}
