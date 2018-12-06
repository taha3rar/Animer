import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ClientsModule } from './clients/clients.module';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionsListComponent } from './transaction/transactions-list/transactions-list.component';
// tslint:disable-next-line:max-line-length
import { TransactionProformaInvoiceComponent } from './transaction/transaction-proforma-invoice/transaction-proforma-invoice.component';
import { TransactionPoComponent } from './transaction/transaction-po/transaction-po.component';
import { TransactionDocumentsComponent } from './transaction/transaction-documents/transaction-documents.component';
// tslint:disable-next-line:max-line-length
import { TransactionQuoteRequestComponent } from './transaction/transaction-quote-request/transaction-quote-request.component';
import { OrderComponent } from './order/order.component';
import { OrderPoComponent } from './order/order-po/order-po.component';
import { OrdersListComponent } from './order/orders-list/orders-list.component';
import { OrderInvoiceComponent } from './order/order-invoice/order-invoice.component';
import { OrderDocumentsComponent } from './order/order-documents/order-documents.component';
import { ProductComponent } from './product/product.component';
import { ProductsListComponent } from './product/products-list/products-list.component';
import { EcosystemComponent } from './ecosystem/ecosystem.component';
import { EcosystemsListComponent } from './ecosystem/ecosystems-list/ecosystems-list.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoicesListComponent } from './invoice/invoices-list/invoices-list.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule,
    CoreModule,
    SharedModule,
    ShellModule,
    HomeModule,
    LoginModule,
    ClientsModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    AppRoutingModule // must be imported as the last module as it contains the fallback route
  ],
  declarations: [
    AppComponent,
    TransactionComponent,
    TransactionsListComponent,
    TransactionProformaInvoiceComponent,
    TransactionPoComponent,
    TransactionDocumentsComponent,
    TransactionQuoteRequestComponent,
    OrderComponent,
    OrderPoComponent,
    OrdersListComponent,
    OrderInvoiceComponent,
    OrderDocumentsComponent,
    ProductComponent,
    ProductsListComponent,
    EcosystemComponent,
    EcosystemsListComponent,
    InvoiceComponent,
    InvoicesListComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
