// tslint:disable-next-line:max-line-length
import { ProcessedProductGeneratorComponent } from './../product/product-generator/processed-product-generator/processed-product-generator.component';
// tslint:disable-next-line:max-line-length
import { AgriculturalProductGeneratorComponent } from './../product/product-generator/agricultural-product-generator/agricultural-product-generator.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { DashboardWelcomePanelComponent } from './dashboard-welcome-panel/dashboard-welcome-panel.component';
import { DashboardTodoPanelComponent } from './dashboard-todo-panel/dashboard-todo-panel.component';
import { DashboardActivityPanelComponent } from './dashboard-activity-panel/dashboard-activity-panel.component';
import { DashboardCounterPanelComponent } from './dashboard-counter-panel/dashboard-counter-panel.component';
import { DashboardCounterResolver } from './resolvers/dashboard-counter.resolver';
import { NgxPermissionsModule } from 'ngx-permissions';
import { StartingGuideComponent } from './starting-guide/starting-guide.component';
import { SharedModule } from '@app/shared';
import { CurrentUserProgressResolver } from '@app/shared/resolvers/current-user-progress.resolver';

@NgModule({
  declarations: [
    DashboardMainComponent,
    DashboardWelcomePanelComponent,
    DashboardTodoPanelComponent,
    DashboardActivityPanelComponent,
    DashboardCounterPanelComponent,
    StartingGuideComponent
  ],
  entryComponents: [AgriculturalProductGeneratorComponent, ProcessedProductGeneratorComponent],
  imports: [SharedModule, CommonModule, TranslateModule, DashboardRoutingModule, NgxPermissionsModule.forRoot()],
  providers: [DashboardCounterResolver, CurrentUserProgressResolver]
})
export class DashboardModule {}
