import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ProfileRoutingModule } from './profile-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { from } from 'rxjs';
import { ProfilePasswordComponent } from './profile-password/profile-password.component';

@NgModule({
  declarations: [ProfileComponent, ProfilePasswordComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressbarModule.forRoot(),
    SharedModule
  ]
})
export class ProfileModule {}
