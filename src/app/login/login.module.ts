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
import {
  SocialLoginModule,
  AuthServiceConfig,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angularx-social-login';

// Client id for the social networks oauth. This is used for validation of the AGT application to facebook or google.
const facebook_oauth_client_id = '2144166195710655';
const google_oauth_client_id = '497849531719-0n3ksh04e1ackgktbifu5gvddi6rmqso.apps.googleusercontent.com';
const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(facebook_oauth_client_id)
  },
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(google_oauth_client_id)
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    FormsModule,
    NgbModule,
    LoginRoutingModule,
    RouterModule,
    CommonModule,
    SocialLoginModule,
    NgxPermissionsModule.forRoot()
  ],
  declarations: [LoginComponent, ForgotPasswordComponent, ResetPasswordComponent],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  entryComponents: [LoginComponent]
})
export class LoginModule {}
