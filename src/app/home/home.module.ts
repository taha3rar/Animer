import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, Angulartics2Module, HomeRoutingModule]
})
export class HomeModule {}
