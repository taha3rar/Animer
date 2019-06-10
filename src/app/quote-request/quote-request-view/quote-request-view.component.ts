import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';

@Component({
  selector: 'app-quote-request-view',
  templateUrl: './quote-request-view.component.html',
  styleUrls: ['./quote-request-view.component.scss']
})
export class QuoteRequestViewComponent implements OnInit {
  quoteRequest: QuoteRequest;

  constructor(private location: Location, private route: ActivatedRoute) {}

  ngOnInit() {
    this.quoteRequest = this.route.snapshot.data['quoteRequest'];
    console.log(this.quoteRequest);
  }

  back() {
    this.location.back();
  }
}
