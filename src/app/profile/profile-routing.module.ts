import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { ProfileComponent } from './profile.component';
import { extract } from '@app/core';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'profile',
      component: ProfileComponent,
      data: { title: extract('Profile') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ProfileRoutingModule {}
