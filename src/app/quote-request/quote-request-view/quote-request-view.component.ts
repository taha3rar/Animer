import { Quotation } from './../../core/models/quotation/quotation';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
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

  constructor(private location: Location, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.quoteRequest = this.route.snapshot.data['quoteRequest'];
    this.quotation = this.route.snapshot.data['quotation'];
  }

  back() {
    this.location.back();
  }
}
