import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { TransactionsListComponent } from '@app/transaction/transactions-list/transactions-list.component';
import { TransactionListResolver } from './resolvers/transaction-list.resolver';
import { TransactionComponent } from './transaction.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'transaction/list',
      component: TransactionsListComponent,
      resolve: { transactions: TransactionListResolver },
      data: { title: extract('Transactions') }
    },
    {
      path: 'transaction/:id',
      component: TransactionComponent
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TransactionRoutingModule {}