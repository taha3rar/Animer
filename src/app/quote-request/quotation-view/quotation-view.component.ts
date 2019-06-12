import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';
import { QuotationService } from '@app/core';
import { Quotation } from '@app/core/models/quotation/quotation';

@Component({
  selector: 'app-quotation-view',
  templateUrl: './quotation-view.component.html',
  styleUrls: ['./quotation-view.component.scss']
})
export class QuotationViewComponent implements OnInit {
  quoteRequest: QuoteRequest;
  quotation: Quotation;

  constructor(private quotationService: QuotationService, private location: Location, private route: ActivatedRoute) {}

  ngOnInit() {
    this.quoteRequest = this.route.snapshot.data['quoteRequest'];
    this.quotation = this.route.snapshot.data['quotation'];
  }

  back() {
    this.location.back();
  }
}
