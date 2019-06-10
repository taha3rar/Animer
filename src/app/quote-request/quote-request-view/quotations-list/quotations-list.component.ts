import { Component, OnInit, Input } from '@angular/core';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';
import { Quotation } from '@app/core/models/quotation/quotation';
import { QuotationService } from '@app/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quotations-list',
  templateUrl: './quotations-list.component.html',
  styleUrls: ['./quotations-list.component.scss']
})
export class QuotationsListComponent implements OnInit {
  page = 1;
  quoteRequest: QuoteRequest;
  quotations: Quotation[];

  constructor(private quotationService: QuotationService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.quoteRequest = this.route.snapshot.data['quoteRequest'];
    this.quotationService.getByQuoteRequest(this.quoteRequest._id).subscribe(quotations => {
      this.quotations = quotations;
      console.log(this.quotations);
    });
  }
}
