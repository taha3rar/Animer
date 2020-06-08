import { SdkService } from './../../core/sdk.service';
import { DPOAccount } from '@avenews/agt-sdk';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-payment-activation',
  templateUrl: './payment-activation.component.html',
  styleUrls: ['./payment-activation.component.scss']
})
export class PaymentActivationComponent implements OnInit {
  topupReady = false; // will be getting it from sdk or user object depends
  @Input() dpoAccount: DPOAccount;
  constructor(private router: Router, private sdkService: SdkService) {}
  ngOnInit() {
    if (this.dpoAccount && this.dpoAccount.status !== 'approved') {
      this.topupReady = false;
    } else {
      this.topupReady = true;
    }
  }
  dontShow(e: any) {
    if (!this.topupReady) {
      e.stopPropagation(); // stop the modal from popping up when disabled
    }
  }
  topup(e: any) {
    // sdk topup method.
    this.sdkService
      .submitTopupRequest(e)
      .then(data => {
        // success message
      })
      .catch(err => {
        console.log(err);
        // error message
      });
  }
  kyc() {
    if (!this.topupReady) {
      this.router.navigate(['profile', 'kyc']);
    }
  }
}
