import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from '@app/core/models/transaction';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from '../base-list/base-list.component';
import { TransactionService } from '@app/core';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent extends BaseListComponent implements OnInit {
  @Input()
  transactions: Transaction[];

  page = 1;
  constructor(private transactionService: TransactionService, protected router: Router) {
    super(transactionService, router, {
      deleteText: 'Once deleted, you will not be able to recover this transaction!'
    });
  }

  ngOnInit() {}
}
