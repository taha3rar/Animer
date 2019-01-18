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

@NgModule({
  declarations: [
    DashboardMainComponent,
    DashboardWelcomePanelComponent,
    DashboardTodoPanelComponent,
    DashboardActivityPanelComponent,
    DashboardCounterPanelComponent
  ],
  imports: [CommonModule, TranslateModule, DashboardRoutingModule, NgxPermissionsModule.forRoot()],
  providers: [DashboardCounterResolver]
})
export class DashboardModule {}
