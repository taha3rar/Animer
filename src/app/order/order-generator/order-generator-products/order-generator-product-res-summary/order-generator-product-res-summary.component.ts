import { Component, OnInit, Input } from '@angular/core';
import { Product } from '@app/core/models/order/product';
import { FormGroup, FormArray } from '@angular/forms';
declare const $: any;
@Component({
  selector: 'app-order-generator-product-res-summary',
  templateUrl: './order-generator-product-res-summary.component.html',
  styleUrls: ['./order-generator-product-res-summary.component.scss']
})
export class OrderGeneratorProductResSummaryComponent implements OnInit {
  @Input()
  productList: Product[];
  @Input()
  form: FormGroup;
  @Input()
  currency: string;
  @Input() packagesSum = 0;

  constructor() {}

  ngOnInit() {}

  toggleOrderSummary() {
    $('.sm-vp-summary').toggleClass('closed-summary opened-summary');
    if ($('.sm-vp-summary').hasClass('opened-summary')) {
      $('.vp-summary-main').css('display', 'none');
    } else {
      $('.vp-summary-main').css('display', 'flex');
    }
  }

  get order() {
    return this.form.controls;
  }
}
