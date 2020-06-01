import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { LoginComponent } from './login.component';
import { ResetPasswordComponent } from './forgot-password/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: extract('Login') } },
  { path: 'forgot-password', component: ForgotPasswordComponent, data: { title: extract('Forgot Password') } },
  { path: 'reset-password/:token', component: ResetPasswordComponent, data: { title: extract('Reset Password') } },
  { path: 'validation/:id', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LoginRoutingModule {}
