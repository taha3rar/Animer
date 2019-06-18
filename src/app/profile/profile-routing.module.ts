import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { ProfileComponent } from './profile/profile.component';
import { UserResolver } from '@app/shared/resolvers/user.resolver';
import { extract } from '@app/core';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'profile',
      component: ProfileComponent,
      data: { title: extract('Profile') },
      resolve: {
        currentUser: UserResolver
      }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UserResolver]
})
export class ProfileRoutingModule {}
