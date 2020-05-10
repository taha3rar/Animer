import { CurrentUserResolver } from '@app/shared/resolvers/current-user.resolver';
import { Routes, Route } from '@angular/router';

import { AuthenticationGuard } from '@app/core';
import { ShellComponent } from './shell/shell.component';
import { NotificationListResolver } from './resolvers/notification-list.resolver';
import { CurrentUserProgressResolver } from '@app/shared/resolvers/current-user-progress.resolver';

/**
 * Provides helper methods to create routes.
 */
export class Shell {
  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return The new route using shell as the base.
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: ShellComponent,
      children: routes,
      canActivate: [AuthenticationGuard],
      runGuardsAndResolvers: 'always',
      // Reuse ShellComponent instance when navigating between child views
      data: { reuse: true },
      resolve: {
        // notifications: NotificationListResolver,
        currentUser: CurrentUserResolver,
        progress: CurrentUserProgressResolver
      }
    };
  }
}
