import { ClientComponent } from './client/client.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { ClientListComponent } from './client-list/client-list.component';
import { Shell } from '@app/shell/shell.service';
import { ClientListResolver } from './resolvers/client-list.resolver';
import { EcosystemListResolver } from '@app/ecosystem/resolvers/ecosystem-list.resolver';

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
      component: ClientComponent
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ClientRoutingModule {}
