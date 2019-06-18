import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { EcosystemsListComponent } from './ecosystems-list/ecosystems-list.component';
import { EcosystemComponent } from './ecosystem/ecosystem.component';
import { UserEcosystemsResolver } from '@app/shared/resolvers/user-ecosystems.resolver';
import { UserClientsResolver } from '@app/shared/resolvers/user-clients.resolver';
import { UserResolver } from '../shared/resolvers/user.resolver';
import { EcosystemResolver } from './resolvers/ecosystem.resolver';
import { EcosystemGuard } from '../shared/guards/ecosystem.guard';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'ecosystem/list',
      component: EcosystemsListComponent,
      data: { title: extract('Ecosystems') },
      resolve: {
        ecosystems: UserEcosystemsResolver,
        user: UserResolver,
        userClients: UserClientsResolver
      },
      runGuardsAndResolvers: 'always'
    },
    {
      path: 'ecosystem/:id',
      component: EcosystemComponent,
      canActivate: [EcosystemGuard],
      resolve: {
        ecosystem: EcosystemResolver,
        userClients: UserClientsResolver
      },
      runGuardsAndResolvers: 'always'
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [EcosystemGuard]
})
export class EcosystemRoutingModule {}
