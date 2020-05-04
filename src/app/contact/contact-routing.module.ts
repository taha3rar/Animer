import { ContactComponent } from './contact/contact.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { Shell } from '@app/shell/shell.service';
import { CurrentUserContactsResolver } from '@app/shared/resolvers/current-user-contacts.resolver';
import { ContactResolver } from './resolvers/contact.resolver';
import { CurrentUserResolver } from '@app/shared/resolvers/current-user.resolver';
import { UserDocumentListResolver } from './resolvers/document-list.resolver';
import { ContactGuard } from '../shared/guards/contact.guard';
import { PermissionGuard } from '../shared/guards/permission.guard';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'contact',
      component: ContactListComponent,
      resolve: {
        currentUser: CurrentUserResolver,
        contacts: CurrentUserContactsResolver
      },
      canActivate: [PermissionGuard],
      data: {
        title: 'Contacts',
        permission: 'list-clients'
      },
      runGuardsAndResolvers: 'always'
    },
    {
      path: 'contact/:id',
      component: ContactComponent,
      canActivate: [ContactGuard],
      resolve: {
        user: ContactResolver,
        documents: UserDocumentListResolver
      },
      runGuardsAndResolvers: 'always'
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ContactGuard, PermissionGuard]
})
export class ContactRoutingModule {}
