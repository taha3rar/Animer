import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { ClientListComponent } from './client-list/client-list.component';
import { Shell } from '@app/shell/shell.service';
import { ClientListResolver } from './resolvers/client-list.resolver';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'client/list',
      component: ClientListComponent,
      resolve: { clients: ClientListResolver },
      data: { title: extract('Clients') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ClientRoutingModule {}
