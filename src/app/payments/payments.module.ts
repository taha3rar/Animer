import { PaymentsRoutingModule } from './payments-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentActivationComponent } from './payment-activation/payment-activation.component';
import { PaymentsListComponent } from './payments-list/payments-list.component';
import { ContactPaymentComponent } from './contact-payment/contact-payment.component';
import { ContactPaymentDetailsComponent } from './contact-payment/contact-payment-details/contact-payment-details.component';
import { PaymentDocumentComponent } from './payment-document/payment-document.component';

@NgModule({
  declarations: [
    PaymentActivationComponent,
    PaymentsListComponent,
    ContactPaymentComponent,
    ContactPaymentDetailsComponent,
    PaymentDocumentComponent
  ],
  imports: [CommonModule, PaymentsRoutingModule]
})
export class PaymentsModule {}
