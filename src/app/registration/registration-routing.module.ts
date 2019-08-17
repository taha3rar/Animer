import { RegistrationComponent } from './registration.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { extract } from '@app/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent, data: { title: extract('registration') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class RegistrationRoutingModule {}
