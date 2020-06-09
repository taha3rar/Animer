import { DPOAccount, DPOWallet } from '@avenews/agt-sdk';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.scss']
})
export class PaymentsListComponent implements OnInit {
  availablePayments = true;
  dpoAccount: DPOAccount;
  wallet: DPOWallet;
  topUpApproved = false;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      console.log(data);
      this.dpoAccount = data['account'];
      this.wallet = data['wallet'];
      if (
        this.dpoAccount &&
        this.dpoAccount.status === 'approved' &&
        this.wallet &&
        this.wallet.firstTopUpStatus &&
        this.wallet.firstTopUpStatus === 'approved'
      ) {
        this.topUpApproved = true;
        console.log(true);
      }
    });
  }
}
