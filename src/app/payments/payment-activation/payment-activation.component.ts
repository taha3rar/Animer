import { Component, OnInit } from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-payment-activation',
  templateUrl: './payment-activation.component.html',
  styleUrls: ['./payment-activation.component.scss']
})
export class PaymentActivationComponent implements OnInit {
  topupReady = false;
  constructor() {}
  ngOnInit() {}
  dontShow(e: any) {
    if (!this.topupReady) {
      e.stopPropagation();
    }
  }
}
