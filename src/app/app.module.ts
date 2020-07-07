import { PaymentsModule } from './payments/payments.module';
import { HelpCenterModule } from './help-center/help-center.module';
import { ProfileModule } from './profile/profile.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { NgxPermissionsModule } from 'ngx-permissions';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { ShellModule } from './shell/shell.module';
import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ContactModule } from './contact/contact.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { NotificationsModule } from './notifications/notifications.module';
// import { FinanceModule } from './finance/finance.module';
import { LandingModule } from './landing/landing.module';
import { RegistrationModule } from './registration/registration.module';
import { IntercomModule } from 'ng-intercom';
import { environment } from '@env/environment.local';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoodsReceiveNoteModule } from './goods-receive-note/goods-receive-note.module';
import { FinanceModule } from './finance/finance.module';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule,
    CoreModule,
    SharedModule,
    ShellModule,
    DashboardModule,
    LoginModule,
    ContactModule,
    DashboardModule,
    ProfileModule,
    NotificationsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FinanceModule,
    LandingModule,
    PaymentsModule,
    RegistrationModule,
    HelpCenterModule,
    GoodsReceiveNoteModule,
    IntercomModule.forRoot({
      appId: environment.intercom.app_id,
      updateOnRouterChange: true, // will automatically run `update` on router event changes. Default: `false`
    }),
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    NgxPermissionsModule.forRoot(),
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],
  exports: [NgxPermissionsModule],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
