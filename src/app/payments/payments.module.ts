import { SharedModule } from '@app/shared';
import { PaymentsRoutingModule } from './payments-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentActivationComponent } from './payment-activation/payment-activation.component';
import { PaymentsListComponent } from './payments-list/payments-list.component';
import { ContactPaymentComponent } from './contact-payment/contact-payment.component';
import { ContactPaymentDetailsComponent } from './contact-payment/contact-payment-details/contact-payment-details.component';
import { PaymentDocumentComponent } from './payment-document/payment-document.component';
import { PaymentViewComponent } from './payment-view/payment-view.component';
import { DocumentPaymentComponent } from './document-payment/document-payment.component';
import { DocumentPaymentDocumentsComponent } from './document-payment/document-payment-documents/document-payment-documents.component';
import { DocumentPaymentDetailsComponent } from './document-payment/document-payment-details/document-payment-details.component';

@NgModule({
  declarations: [
    PaymentActivationComponent,
    PaymentsListComponent,
    ContactPaymentComponent,
    ContactPaymentDetailsComponent,
    PaymentDocumentComponent,
    PaymentViewComponent,
    DocumentPaymentComponent,
    DocumentPaymentDocumentsComponent,
    DocumentPaymentDetailsComponent
  ],
  imports: [CommonModule, PaymentsRoutingModule, SharedModule]
})
export class PaymentsModule {}
