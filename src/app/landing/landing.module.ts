import { LottieAnimationViewModule } from 'ng-lottie';
import { AppModule } from './../app.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { RouterLink, RouterModule } from '@angular/router';

@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, SharedModule, LottieAnimationViewModule.forRoot(), RouterModule],
  exports: [LandingComponent]
})
export class LandingModule {}
