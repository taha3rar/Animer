import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-transaction-po',
  templateUrl: './transaction-po.component.html',
  styleUrls: ['./transaction-po.component.scss']
})
export class TransactionPoComponent implements OnInit {
  @Input()
  completedPO = false;

  constructor() {}

  ngOnInit() {}

  completed() {
    this.completedPO = true;
  }
}
