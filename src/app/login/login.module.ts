import { ResetPasswordComponent } from './forgot-password/reset-password/reset-password.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { environment } from 'environments/environment';
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

const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.oauthClientIds.facebook)
  },
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.oauthClientIds.google)
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
