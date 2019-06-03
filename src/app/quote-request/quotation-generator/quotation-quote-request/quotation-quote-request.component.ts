import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quotation-quote-request',
  templateUrl: './quotation-quote-request.component.html',
  styleUrls: ['./quotation-quote-request.component.scss']
})
export class QuotationQuoteRequestComponent implements OnInit {
  @Input() isGenerator = true;
  constructor() {}
  ngOnInit() {}
}
