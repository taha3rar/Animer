import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { PurchaseOrder } from '@app/core/models/transaction/po';
import { Transaction } from '@app/core/models/transaction';

@Component({
  selector: 'app-transaction-po',
  templateUrl: './transaction-po.component.html',
  styleUrls: ['./transaction-po.component.scss']
})
export class TransactionPoComponent implements OnInit {
  tour: any;

  @Input()
  completedPO = false;
  purchaseOrder: PurchaseOrder = new PurchaseOrder();
  transaction: Transaction = new Transaction();

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.purchaseOrder = this.route.snapshot.data['purchaseOrder'];
    this.transaction = this.route.snapshot.data['transaction'];
  }
}
