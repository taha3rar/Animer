import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-quotation-view',
  templateUrl: './quotation-view.component.html',
  styleUrls: ['./quotation-view.component.scss']
})
export class QuotationViewComponent implements OnInit {
  @Input() isGenerator = false;
  @Input() isView = false;

  constructor(private location: Location) {}

  ngOnInit() {}

  back() {
    this.location.back();
  }
}
