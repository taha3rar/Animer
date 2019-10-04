import { RegistrationRoutingModule } from './registration-routing.module';
import { NgModule } from '@angular/core';
import { environment } from 'environments/environment';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSortModule } from '@angular/material';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import {
  SocialLoginModule,
  AuthServiceConfig,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LoginOpt
} from 'angularx-social-login';

const fbLoginOptions: LoginOpt = {
  auth_type: 'rerequest',
  scope: 'email',
  return_scopes: true
};
const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.oauthClientIds.facebook, fbLoginOptions)
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
  declarations: [RegistrationComponent, TermsOfUseComponent, PrivacyPolicyComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    SharedModule,
    NgbModule,
    SocialLoginModule,
    MatSortModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ]
})
export class RegistrationModule {}
