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

@NgModule({
  declarations: [
    TransactionDocumentsComponent,
    TransactionPoComponent,
    TransactionProformaInvoiceComponent,
    TransactionQuoteRequestComponent,
    TransactionComponent,
    TransactionListComponent,
    CreateQuoteRequestComponent,
    TransactionDetailsComponent
  ],
  imports: [CommonModule, TransactionRoutingModule, TranslateModule, NgbModule, SharedModule],
  providers: [TransactionListResolver]
})
export class TransactionModule {}
