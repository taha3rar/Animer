import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { EcosystemsListComponent } from './ecosystems-list/ecosystems-list.component';
import { EcosystemComponent } from './ecosystem/ecosystem.component';
import { EcosystemListResolver } from './resolvers/ecosystem-list.resolver';
import { UserClientListResolver } from './resolvers/user-client-list.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { EcosystemResolver } from './resolvers/ecosystem.resolver';
import { EcosystemGuard } from './guards/ecosystem.guard';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'ecosystem/list',
      component: EcosystemsListComponent,
      data: { title: extract('Ecosystems') },
      resolve: {
        ecosystems: EcosystemListResolver,
        user: UserResolver,
        userClients: UserClientListResolver
      },
      runGuardsAndResolvers: 'always'
    },
    {
      path: 'ecosystem/:id',
      component: EcosystemComponent,
      canActivate: [EcosystemGuard],
      resolve: {
        ecosystem: EcosystemResolver,
        userClients: UserClientListResolver
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
