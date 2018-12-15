import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { TransactionListResolver } from './resolvers/transaction-list.resolver';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'transaction/list',
      component: TransactionListComponent,
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
