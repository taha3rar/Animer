import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Shell } from '@app/shell/shell.service';
import { Routes } from '@angular/router';
import { extract } from '@app/core';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, TranslateModule, ProfileRoutingModule]
})
export class ProfileModule {}
