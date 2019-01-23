import { TransactionResolver } from './resolvers/transaction.resolver';
import { QuoteRequestResolver } from './resolvers/quote-request.resolver';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionRoutingModule } from './transaction-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { TransactionDocumentsComponent } from './transaction-documents/transaction-documents.component';
import { TransactionProformaInvoiceComponent } from './transaction-proforma-invoice/transaction-proforma-invoice.component';
import { TransactionQuoteRequestComponent } from './transaction-quote-request/transaction-quote-request.component';
import { TransactionListResolver } from './resolvers/transaction-list.resolver';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionComponent } from './transaction/transaction.component';
import { CreateQuoteRequestComponent } from './create-quote-request/create-quote-request.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@app/shared';
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
import { TransactionSellerComponent } from './transaction/transaction-seller/transaction-seller.component';
import { TransactionBuyerComponent } from './transaction/transaction-buyer/transaction-buyer.component';
import { NgxPermissionsModule } from 'ngx-permissions';
// tslint:disable-next-line:max-line-length
import { TransactionProformaInvoiceDetailsComponent } from './transaction-proforma-invoice/transaction-proforma-invoice-details/transaction-proforma-invoice-details.component';
// tslint:disable-next-line:max-line-length
import { TransactionProformaInvoiceSellerComponent } from './transaction-proforma-invoice/transaction-proforma-invoice-seller/transaction-proforma-invoice-seller.component';
// tslint:disable-next-line:max-line-length
import { TransactionProformaInvoiceBuyerComponent } from './transaction-proforma-invoice/transaction-proforma-invoice-buyer/transaction-proforma-invoice-buyer.component';
import { TransactionPurchaseOrderComponent } from './transaction-purchase-order/transaction-purchase-order.component';

@NgModule({
  declarations: [
    TransactionDocumentsComponent,
    TransactionPurchaseOrderComponent,
    TransactionProformaInvoiceComponent,
    TransactionQuoteRequestComponent,
    TransactionComponent,
    TransactionListComponent,
    CreateQuoteRequestComponent,
    TransactionProformaInvoiceDetailsComponent,
    TransactionChatComponent,
    CreateQuoteRequestProductDetailsComponent,
    CreateQuoteRequestPackingDetailsComponent,
    CreateQuoteRequestShippingDetailsComponent,
    CreateQuoteRequestAdditionalDetailsComponent,
    TransactionSellerComponent,
    TransactionBuyerComponent,
    TransactionProformaInvoiceSellerComponent,
    TransactionProformaInvoiceBuyerComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    TranslateModule,
    NgbModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forRoot()
  ],
  providers: [
    TransactionListResolver,
    QuoteRequestResolver,
    TransactionResolver,
    UserSupplierListResolver,
    UserEcosystemsResolver
  ]
})
export class TransactionModule {}
