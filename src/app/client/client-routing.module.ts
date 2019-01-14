import { ClientComponent } from './client/client.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { ClientListComponent } from './client-list/client-list.component';
import { Shell } from '@app/shell/shell.service';
import { ClientListResolver } from './resolvers/client-list.resolver';
import { EcosystemListResolver } from '@app/ecosystem/resolvers/ecosystem-list.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { TransactionListResolver } from './resolvers/transaction-list.resolver';
import { OrderListResolver } from './resolvers/order-list.resolver';
import { InvoiceListResolver } from './resolvers/invoice-list.resolver';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'client/list',
      component: ClientListComponent,
      resolve: {
        clients: ClientListResolver,
        ecosystems: EcosystemListResolver
      },
      data: { title: extract('Clients') },
      runGuardsAndResolvers: 'always'
    },
    {
      path: 'client/:id',
      component: ClientComponent,
      resolve: {
        user: UserResolver,
        transactions: TransactionListResolver,
        orders: OrderListResolver,
        invoices: InvoiceListResolver
      }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ClientRoutingModule {}
