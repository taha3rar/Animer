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
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';

// Client id for the facebook oauth. This is used for validation of our application to facebook.
// https://developers.facebook.com/
const facebook_oauth_client_id = '2144166195710655';
const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(facebook_oauth_client_id)
  }
]);

@NgModule({
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    FormsModule,
    NgbModule,
    LoginRoutingModule,
    RouterModule,
    CommonModule,
    SocialLoginModule.initialize(config),
    NgxPermissionsModule.forRoot()
  ],
  declarations: [LoginComponent, ForgotPasswordComponent, ResetPasswordComponent],
  entryComponents: [LoginComponent]
})
export class LoginModule {}
