import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DPOTransaction } from '@avenews/agt-sdk';

@Component({
  selector: 'app-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.scss']
})
export class PaymentViewComponent implements OnInit {
  transaction: DPOTransaction;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.transaction = data.transaction;
    });
  }
}
