import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Shell } from '@app/shell/shell.service';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { extract } from '@app/core';
import { NotificationListResolver } from './resolvers/notification-list.resolver';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'notifications',
      component: NotificationListComponent,
      data: { title: extract('Notifications') },
      resolve: {
        notifications: NotificationListResolver
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
export class NotificationsRouting {}