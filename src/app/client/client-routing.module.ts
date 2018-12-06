import { InvoiceComponent } from './../invoice/invoice.component';
import { InvoicesListComponent } from './../invoice/invoices-list/invoices-list.component';
import { EcosystemsListComponent } from './../ecosystem/ecosystems-list/ecosystems-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { ClientListComponent } from './client-list/client-list.component';
import { Shell } from '@app/shell/shell.service';
import { ClientGeneratorComponent } from './client-generator/client-generator.component';
import { ClientListResolver } from './resolvers/client-list.resolver';
import { TransactionsListComponent } from '@app/transaction/transactions-list/transactions-list.component';
import { OrderComponent } from '@app/order/order.component';
import { OrdersListComponent } from '@app/order/orders-list/orders-list.component';
import { EcosystemComponent } from '@app/ecosystem/ecosystem.component';
import { ProductsListComponent } from '@app/product/products-list/products-list.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'client/list',
      component: ClientListComponent,
      resolve: { clients: ClientListResolver },
      data: { title: extract('Clients') }
    },
    {
      path: 'client/new',
      component: ClientGeneratorComponent,
      data: { title: extract('New Client') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ClientRoutingModule {}
