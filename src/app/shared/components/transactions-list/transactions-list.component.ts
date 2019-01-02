import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from '@app/core/models/transaction';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {
  @Input()
  transactions: Transaction[];

  page = 1;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}

  warning() {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this transaction!',
      icon: 'warning'
    });
  }
}
