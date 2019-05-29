import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-quote-request-view',
  templateUrl: './quote-request-view.component.html',
  styleUrls: ['./quote-request-view.component.scss']
})
export class QuoteRequestViewComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit() {}

  back() {
    this.location.back();
  }
}
