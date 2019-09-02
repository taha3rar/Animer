import { ResetPasswordComponent } from './forgot-password/reset-password/reset-password.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    FormsModule,
    NgbModule,
    LoginRoutingModule,
    RouterModule,
    CommonModule,
    NgxPermissionsModule.forRoot()
  ],
  declarations: [LoginComponent, ForgotPasswordComponent, ResetPasswordComponent],
  entryComponents: [LoginComponent]
})
export class LoginModule {}
