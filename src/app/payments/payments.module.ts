import { PaymentsRoutingModule } from './payments-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentActivationComponent } from './payment-activation/payment-activation.component';
import { PaymentsListComponent } from './payments-list/payments-list.component';

@NgModule({
  declarations: [PaymentActivationComponent, PaymentsListComponent],
  imports: [CommonModule, PaymentsRoutingModule]
})
export class PaymentsModule {}
