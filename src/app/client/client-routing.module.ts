import { ClientComponent } from './client/client.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';
import { ClientListComponent } from './client-list/client-list.component';
import { Shell } from '@app/shell/shell.service';
import { CurrentUserClientsResolver } from '@app/shared/resolvers/current-user-clients.resolver';
import { CurrentUserEcosystemsResolver } from '@app/shared/resolvers/current-user-ecosystems.resolver';
import { ClientResolver } from './resolvers/client.resolver';
import { CurrentUserResolver } from '@app/shared/resolvers/current-user.resolver';
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
        currentUser: CurrentUserResolver,
        clients: CurrentUserClientsResolver,
        ecosystems: CurrentUserEcosystemsResolver
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
