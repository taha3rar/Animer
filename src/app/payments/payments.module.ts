import { ProductQuantityPipe } from './../shared/pipes/product-quantity.pipe';
import { MultiProductPipe } from './../shared/pipes/multi-products.pipe';
import { MyGrnsResolver } from './../goods-receive-note/resolvers/grn-mine.resolver';
import { DpoAccountResolver } from './resolvers/dpo-account.resolver';
import { SharedModule } from './../shared/shared.module';
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
import { PaymentSettingsComponent } from './payment-settings/payment-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopupComponent } from './topup/topup.component';
import { DpoWalletResolver } from './resolvers/dpo-wallet.resolver';
import { DpoTransactionResolver } from './resolvers/dpo-transaction.resolver';
import { NgxPaginationModule } from 'ngx-pagination';
import { TransactionViewResolver } from './resolvers/transaction-view.resolver';
import { MatTabsModule, MatSortModule, MatTooltipModule } from '@angular/material';
import { TopupViewComponent } from './topup-view/topup-view.component';
import { NotPaidPipe } from '@app/shared/pipes/not-paid.pipe';

@NgModule({
  declarations: [
    PaymentActivationComponent,
    PaymentsListComponent,
    ContactPaymentComponent,
    ContactPaymentDetailsComponent,
    PaymentDocumentComponent,
    TopupComponent,
    PaymentViewComponent,
    PaymentSettingsComponent,
    DocumentPaymentComponent,
    DocumentPaymentDocumentsComponent,
    TopupViewComponent,
    DocumentPaymentDetailsComponent,
    TopupViewComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatTabsModule,
    MatSortModule,
    MatTooltipModule,
    PaymentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [
    DpoAccountResolver,
    DpoWalletResolver,
    DpoTransactionResolver,
    TransactionViewResolver,
    MyGrnsResolver,
    MultiProductPipe,
    ProductQuantityPipe,
    NotPaidPipe
  ],
})
export class PaymentsModule {}
