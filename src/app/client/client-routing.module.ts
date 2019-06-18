import { ClientComponent } from './client/client.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';
import { ClientListComponent } from './client-list/client-list.component';
import { Shell } from '@app/shell/shell.service';
import { UserClientsResolver } from '@app/shared/resolvers/user-clients.resolver';
import { EcosystemListResolver } from '@app/ecosystem/resolvers/ecosystem-list.resolver';
import { ClientResolver } from './resolvers/client.resolver';
import { UserResolver } from '@app/shared/resolvers/user.resolver';
import { OrderListResolver } from './resolvers/order-list.resolver';
import { InvoiceListResolver } from './resolvers/invoice-list.resolver';
import { UserDocumentListResolver } from './resolvers/document-list.resolver';
import { ClientGuard } from '../shared/guards/client.guard';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'client/list',
      component: ClientListComponent,
      resolve: {
        currentUser: UserResolver,
        clients: UserClientsResolver,
        ecosystems: EcosystemListResolver
      },
      data: { title: extract('Clients') },
      runGuardsAndResolvers: 'always'
    },
    {
      path: 'client/:id',
      component: ClientComponent,
      canActivate: [ClientGuard],
      resolve: {
        user: ClientResolver,
        orders: OrderListResolver,
        invoices: InvoiceListResolver,
        documents: UserDocumentListResolver
      },
      runGuardsAndResolvers: 'always'
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ClientGuard]
})
export class ClientRoutingModule {}
