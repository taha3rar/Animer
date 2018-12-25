import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.scss']
})
export class ProductReviewComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  targetStep(target: string) {
    const tab = $('a[href="#' + target + '"]');
    $(tab).click();
  }
}
