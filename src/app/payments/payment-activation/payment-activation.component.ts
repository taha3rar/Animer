import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-payment-activation',
  templateUrl: './payment-activation.component.html',
  styleUrls: ['./payment-activation.component.scss']
})
export class PaymentActivationComponent implements OnInit {
  topupReady = false; // will be getting it from sdk or user object depends
  constructor(private router: Router) {}
  ngOnInit() {}
  dontShow(e: any) {
    if (!this.topupReady) {
      e.stopPropagation(); // stop the modal from popping up when disabled
    }
  }
  topup(e: any) {
    // sdk topup method.
  }
  kyc() {
    if (!this.topupReady) {
      this.router.navigate(['profile', 'kyc']);
    }
  }
}
