import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { ProfileComponent } from './profile/profile.component';
import { CurrentUserResolver } from './resolvers/currentUser.resolver';
import { extract } from '@app/core';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'profile',
      component: ProfileComponent,
      data: { title: extract('Profile') },
      resolve: {
        currentUser: CurrentUserResolver
      }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CurrentUserResolver]
})
export class ProfileRoutingModule {}
