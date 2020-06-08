import { DPOAccount } from '@avenews/agt-sdk';
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
  topUpApproved = false;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      console.log(data);
      this.dpoAccount = data['account'];
      if (this.dpoAccount && this.dpoAccount.status === 'approved') {
        this.topUpApproved = true;
      }
    });
  }
}
