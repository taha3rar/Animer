import { RegistrationRoutingModule } from './registration-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RegistrationComponent],
  imports: [CommonModule, RegistrationRoutingModule, ReactiveFormsModule, RouterModule, FormsModule]
})
export class RegistrationModule {}
