import { TransactionResolver } from './resolvers/transaction.resolver';
import { QuoteRequestResolver } from './resolvers/quote-request.resolver';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionRoutingModule } from './transaction-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { TransactionDocumentsComponent } from './transaction-documents/transaction-documents.component';
import { TransactionPoComponent } from './transaction-po/transaction-po.component';
import { TransactionProformaInvoiceComponent } from './transaction-proforma-invoice/transaction-proforma-invoice.component';
import { TransactionQuoteRequestComponent } from './transaction-quote-request/transaction-quote-request.component';
import { TransactionListResolver } from './resolvers/transaction-list.resolver';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionComponent } from './transaction/transaction.component';
import { CreateQuoteRequestComponent } from './create-quote-request/create-quote-request.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@app/shared';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { ProformaInvoiceResolver } from './resolvers/proforma-invoice.resolver';
import { PurchaseOrderResolver } from './resolvers/purchase-order.resolver';
import { TransactionChatComponent } from './transaction-chat/transaction-chat.component';
// tslint:disable-next-line:max-line-length
import { CreateQuoteRequestProductDetailsComponent } from './create-quote-request/create-quote-request-product-details/create-quote-request-product-details.component';
// tslint:disable-next-line:max-line-length
import { CreateQuoteRequestPackingDetailsComponent } from './create-quote-request/create-quote-request-packing-details/create-quote-request-packing-details.component';
// tslint:disable-next-line:max-line-length
import { CreateQuoteRequestShippingDetailsComponent } from './create-quote-request/create-quote-request-shipping-details/create-quote-request-shipping-details.component';
// tslint:disable-next-line:max-line-length
import { CreateQuoteRequestAdditionalDetailsComponent } from './create-quote-request/create-quote-request-additional-details/create-quote-request-additional-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserEcosystemsResolver } from './resolvers/ecosystem-list.resolver';
import { UserSupplierListResolver } from './resolvers/supplier-list.resolver';

@NgModule({
  declarations: [
    TransactionDocumentsComponent,
    TransactionPoComponent,
    TransactionProformaInvoiceComponent,
    TransactionQuoteRequestComponent,
    TransactionComponent,
    TransactionListComponent,
    CreateQuoteRequestComponent,
    TransactionDetailsComponent,
    TransactionChatComponent,
    CreateQuoteRequestProductDetailsComponent,
    CreateQuoteRequestPackingDetailsComponent,
    CreateQuoteRequestShippingDetailsComponent,
    CreateQuoteRequestAdditionalDetailsComponent
  ],
  imports: [CommonModule, TransactionRoutingModule, TranslateModule, NgbModule, SharedModule, ReactiveFormsModule],
  providers: [
    TransactionListResolver,
    QuoteRequestResolver,
    ProformaInvoiceResolver,
    PurchaseOrderResolver,
    TransactionResolver,
    UserSupplierListResolver,
    UserEcosystemsResolver
  ]
})
export class TransactionModule {}
