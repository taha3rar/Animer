import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientRoutingModule } from './client-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientListResolver } from './resolvers/client-list.resolver';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientGeneratorComponent } from './client-generator/client-generator.component';
import { ClientComponent } from './client/client.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { ClientTransactionsComponent } from './client-transactions/client-transactions.component';
import { ClientOrdersComponent } from './client-orders/client-orders.component';
import { ClientInvoicesComponent } from './client-invoices/client-invoices.component';
import { ClientDocumentsComponent } from './client-documents/client-documents.component';
import { SharedModule } from '@app/shared';
import { EcosystemListResolver } from './resolvers/ecosystem-list.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { OrderListResolver } from './resolvers/order-list.resolver';
import { InvoiceListResolver } from './resolvers/invoice-list.resolver';
import { TransactionListResolver } from './resolvers/transaction-list.resolver';
import { UserDocumentListResolver } from './resolvers/document-list.resolver';

@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
    TranslateModule,
    NgbModule,
    SharedModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  // tslint:disable-next-line:max-line-length
  declarations: [
    ClientListComponent,
    ClientGeneratorComponent,
    ClientComponent,
    ClientProfileComponent,
    ClientTransactionsComponent,
    ClientOrdersComponent,
    ClientInvoicesComponent,
    ClientDocumentsComponent
  ],
  providers: [
    ClientListResolver,
    UserResolver,
    EcosystemListResolver,
    OrderListResolver,
    InvoiceListResolver,
    TransactionListResolver,
    UserDocumentListResolver
  ]
})
export class ClientModule {}
