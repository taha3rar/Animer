import { TransactionResolver } from './resolvers/transaction.resolver';
import { QuoteRequestResolver } from './resolvers/quote-request.resolver';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { TransactionListResolver } from './resolvers/transaction-list.resolver';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionComponent } from './transaction/transaction.component';
import { UserEcosystemsResolver } from './resolvers/ecosystem-list.resolver';
import { UserSupplierListResolver } from './resolvers/supplier-list.resolver';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'transaction/list',
      component: TransactionListComponent,
      resolve: {
        transactions: TransactionListResolver,
        suppliers: UserSupplierListResolver,
        ecosystems: UserEcosystemsResolver
      },
      data: { title: extract('Transactions') },
      runGuardsAndResolvers: 'always'
    },
    {
      path: 'transaction/:id',
      component: TransactionComponent,
      resolve: {
        quoteRequest: QuoteRequestResolver,
        transaction: TransactionResolver
      }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TransactionRoutingModule {}
