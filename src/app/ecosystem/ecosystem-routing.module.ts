import { EcosystemComponent } from './ecosystem/ecosystem.component';
import { EcosystemListComponent } from './ecosystem-list/ecosystem-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { CurrentUserContactsResolver } from '@app/shared/resolvers/current-user-contacts.resolver';
import { ContactGuard } from '../shared/guards/contact.guard';
import { PermissionGuard } from '../shared/guards/permission.guard';

const routes: Routes = [
    Shell.childRoutes([
        {
            path: 'ecosystem',
            component: EcosystemListComponent,
            canActivate: [PermissionGuard],
            data: {
                title: 'Ecosystem',
                // permission: 'list-ecosystem'
            },
            runGuardsAndResolvers: 'always'
        },
        {
          path: 'ecosystem/:id',
          component: EcosystemComponent,
          canActivate: [PermissionGuard],
          data: {
              title: 'Ecosystem',
          },
          runGuardsAndResolvers: 'always'
      },
    ])
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [ContactGuard, PermissionGuard]
})
export class EcosystemRoutingModule { }
