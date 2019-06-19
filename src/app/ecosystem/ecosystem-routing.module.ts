import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { EcosystemsListComponent } from './ecosystems-list/ecosystems-list.component';
import { EcosystemComponent } from './ecosystem/ecosystem.component';
import { CurrentUserEcosystemsResolver } from '@app/shared/resolvers/current-user-ecosystems.resolver';
import { CurrentUserClientsResolver } from '@app/shared/resolvers/current-user-clients.resolver';
import { CurrentUserResolver } from '../shared/resolvers/current-user.resolver';
import { EcosystemResolver } from './resolvers/ecosystem.resolver';
import { EcosystemGuard } from '../shared/guards/ecosystem.guard';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'ecosystem/list',
      component: EcosystemsListComponent,
      data: { title: extract('Ecosystems') },
      resolve: {
        ecosystems: CurrentUserEcosystemsResolver,
        user: CurrentUserResolver,
        userClients: CurrentUserClientsResolver
      },
      runGuardsAndResolvers: 'always'
    },
    {
      path: 'ecosystem/:id',
      component: EcosystemComponent,
      canActivate: [EcosystemGuard],
      resolve: {
        ecosystem: EcosystemResolver,
        userClients: CurrentUserClientsResolver
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
