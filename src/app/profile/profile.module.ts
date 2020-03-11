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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTooltipModule } from '@angular/material';
import { ProfileNotificationsComponent } from './profile-notifications/profile-notifications.component';
import { PaymentSettingsComponent } from './payment-settings/payment-settings.component';

@NgModule({
  declarations: [ProfileComponent, ProfilePasswordComponent, ProfileNotificationsComponent, PaymentSettingsComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressbarModule.forRoot(),
    SharedModule,
    NgbModule,
    MatTooltipModule
  ]
})
export class ProfileModule {}
