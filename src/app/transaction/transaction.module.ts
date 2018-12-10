import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { TransactionRoutingModule } from './transaction-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { TransactionDocumentsComponent } from './transaction-documents/transaction-documents.component';
import { TransactionPoComponent } from './transaction-po/transaction-po.component';
import { TransactionProformaInvoiceComponent } from './transaction-proforma-invoice/transaction-proforma-invoice.component';
import { TransactionQuoteRequestComponent } from './transaction-quote-request/transaction-quote-request.component';
import { TransactionListResolver } from './resolvers/transaction-list.resolver';
import { TransactionComponent } from './transaction.component';

@NgModule({
  declarations: [
    TransactionsListComponent,
    TransactionDocumentsComponent,
    TransactionPoComponent,
    TransactionProformaInvoiceComponent,
    TransactionQuoteRequestComponent,
    TransactionComponent
  ],
  imports: [CommonModule, TransactionRoutingModule, TranslateModule],
  providers: [TransactionListResolver]
})
export class TransactionModule {}
