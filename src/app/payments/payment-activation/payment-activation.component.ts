import { SdkService } from './../../core/sdk.service';
import { DPOAccount, DPOWallet } from '@avenews/agt-sdk';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-payment-activation',
  templateUrl: './payment-activation.component.html',
  styleUrls: ['./payment-activation.component.scss']
})
export class PaymentActivationComponent implements OnInit {
  topupReady = false; // will be getting it from sdk or user object depends
  dpoAccount: DPOAccount;
  wallet: DPOWallet;
  constructor(private route: ActivatedRoute, private router: Router, private sdkService: SdkService) {}
  ngOnInit() {
    this.route.data.subscribe(({ account, wallet }) => {
      this.dpoAccount = account;
      this.wallet = wallet;
      if (
        this.dpoAccount &&
        this.dpoAccount.status &&
        this.dpoAccount.status !== 'rejected' &&
        this.dpoAccount.status !== 'pending-approval'
      ) {
        this.topupReady = true;
      } else {
        this.topupReady = false;
      }
    });
  }

  dontShow(e: any) {
    if (!this.topupReady) {
      e.stopPropagation(); // stop the modal from popping up when disabled
    }
  }

  topup(e: any) {
    this.router.navigateByUrl('payments');
  }

  kyc() {
    if (!this.topupReady) {
      this.router.navigateByUrl('payments/account');
    }
  }
}
