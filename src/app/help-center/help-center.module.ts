import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpCenterRoutingModule } from './help-center-routing.module';
import { HelpCenterComponent } from './help-center.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HelpCenterComponent],
  imports: [CommonModule, RouterModule, HelpCenterRoutingModule]
})
export class HelpCenterModule {}
