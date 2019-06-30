import { Quotation } from './../../core/models/quotation/quotation';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private router: Router) {
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     this.ngOnInit();
    //   }
    // });
  }

  ngOnInit() {
    this.quoteRequest = this.route.snapshot.data['quoteRequest'];
    this.quotation = this.route.snapshot.data['quotation'];
    this.quoteRequest = this.route.snapshot.data['quoteRequest'];
    this.quotations = this.route.snapshot.data['acceptedQuotations'];
    console.log(this.quotations);
  }

  back() {
    this.router.navigateByUrl('/quote-request/list');
  }
}
