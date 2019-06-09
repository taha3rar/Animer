import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html'
})
export class QuotationComponent implements OnInit {
  @Input() isGenerator = false;
  quotationAccepted = false;
  constructor() {}

  ngOnInit() {}
}
