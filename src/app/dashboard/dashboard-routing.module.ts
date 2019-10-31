import { UserProgressResolver } from './resolvers/user-progress.resolver';
import { CurrentUserResolver } from '@app/shared/resolvers/current-user.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { DashboardCounterResolver } from './resolvers/dashboard-counter.resolver';
import { extract } from '@app/core';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: '',
      redirectTo: '/dashboard',
      pathMatch: 'full'
    },
    {
      path: 'dashboard',
      component: DashboardMainComponent,
      resolve: {
        counter: DashboardCounterResolver,
        currentUser: CurrentUserResolver,
        progress: UserProgressResolver
      },
      data: { title: extract('Dashboard') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CurrentUserResolver]
})
export class DashboardRoutingModule {}
