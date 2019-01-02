import { Component, OnInit } from '@angular/core';
import { Transaction } from '@app/core/models/transaction';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-transactions',
  templateUrl: './client-transactions.component.html',
  styleUrls: ['./client-transactions.component.scss']
})
export class ClientTransactionsComponent implements OnInit {
  transactions: Transaction[];
  page = 1;

  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.data.subscribe(({ transactions }) => {
      this.transactions = transactions;
    });
  }

  warning() {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this transaction!',
      icon: 'warning'
    });
  }
}
