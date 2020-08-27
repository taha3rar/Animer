import { DynamicFormsService } from './forms/dynamic-forms-service';
import { StepperService } from './forms/stepper.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RouteReusableStrategy } from './route-reusable-strategy';
import { AuthenticationService } from './authentication/authentication.service';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { AlertsService } from './alerts.service';
import { I18nService } from './i18n.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, TranslateModule, RouterModule, NgxPermissionsModule.forRoot()],
  exports: [NgxPermissionsModule],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
    AlertsService,
    StepperService,
    DynamicFormsService,
    I18nService,
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy
    }
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}
