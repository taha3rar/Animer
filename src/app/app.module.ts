import { QuoteRequestModule } from './quote-request/quote-request.module';
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
import { ClientModule } from './client/client.module';
import { OrderModule } from './order/order.module';
import { InvoiceModule } from './invoice/invoice.module';
import { ProductModule } from './product/product.module';
import { EcosystemModule } from './ecosystem/ecosystem.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { NotificationsModule } from './notifications/notifications.module';
import { RouterModule } from '@angular/router';
import { LandingModule } from './landing/landing.module';
import { RegistrationModule } from './registration/registration.module';

@NgModule({
  imports: [
    BrowserModule,
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
    ClientModule,
    OrderModule,
    InvoiceModule,
    ProductModule,
    DashboardModule,
    ProfileModule,
    EcosystemModule,
    QuoteRequestModule,
    NotificationsModule,
    LandingModule,
    RegistrationModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    NgxPermissionsModule.forRoot(),
    AppRoutingModule // must be imported as the last module as it contains the fallback route
  ],
  exports: [NgxPermissionsModule],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
