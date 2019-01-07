import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { RoundUpPipe } from './pipes/roundup.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderListComponent } from './components/order-list/order-list.component';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { UserDataComponent } from './components/user-data/user-data.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { BaseListComponent } from './components/base-list/base-list.component';
import { UserDocumentComponent } from './components/user-document-list/user-document-list.component';

@NgModule({
  imports: [CommonModule, NgxPaginationModule, NgbModule, RouterModule],
  declarations: [
    LoaderComponent,
    RoundUpPipe,
    InvoiceListComponent,
    OrderListComponent,
    TransactionsListComponent,
    DocumentListComponent,
    UserDataComponent,
    UserDocumentComponent,
    BaseListComponent
  ],
  exports: [
    LoaderComponent,
    RoundUpPipe,
    InvoiceListComponent,
    OrderListComponent,
    TransactionsListComponent,
    DocumentListComponent,
    UserDataComponent,
    UserDocumentComponent
  ]
})
export class SharedModule {}
