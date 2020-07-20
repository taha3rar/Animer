import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DPOTransaction, GoodsReceivedNote } from '@avenews/agt-sdk';

@Component({
  selector: 'app-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.scss'],
})
export class PaymentViewComponent implements OnInit {
  transaction: DPOTransaction;
  grns: GoodsReceivedNote[];
  grn: GoodsReceivedNote;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.transaction = data.transaction;
      this.grns = data.grns;
      const id: any = this.transaction.goodsReceivedNote;
      const index = this.grns.findIndex((grn) => {
        return grn._id === id;
      });
      this.grn = this.grns[index];
    });
  }
}
