import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { EcosystemsListComponent } from './ecosystems-list/ecosystems-list.component';
import { EcosystemComponent } from './ecosystem/ecosystem.component';
import { EcosystemListResolver } from './resolvers/ecosystem-list.resolver';
import { UserClientResolver } from './resolvers/user-client.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { EcosystemResolver } from './resolvers/ecosystem.resolver';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'ecosystem/list',
      component: EcosystemsListComponent,
      data: { title: extract('Ecosystems') },
      resolve: {
        ecosystems: EcosystemListResolver,
        user: UserResolver,
        userClients: UserClientResolver
      },
      runGuardsAndResolvers: 'always'
    },
    {
      path: 'ecosystem/:id',
      component: EcosystemComponent,
      resolve: {
        ecosystem: EcosystemResolver
      },
      runGuardsAndResolvers: 'always'
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class EcosystemRoutingModule {}
