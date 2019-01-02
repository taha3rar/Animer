import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { RoundUpPipe } from './pipes/roundup.pipe';
import { InvoiceListComponent } from './list-components/invoice-list/invoice-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderListComponent } from './list-components/order-list/order-list.component';
import { TransactionsListComponent } from './list-components/transactions-list/transactions-list.component';
import { DocumentListComponent } from './list-components/document-list/document-list.component';

@NgModule({
  imports: [CommonModule, NgxPaginationModule],
  declarations: [
    LoaderComponent,
    RoundUpPipe,
    InvoiceListComponent,
    OrderListComponent,
    TransactionsListComponent,
    DocumentListComponent
  ],
  exports: [
    LoaderComponent,
    RoundUpPipe,
    InvoiceListComponent,
    OrderListComponent,
    TransactionsListComponent,
    DocumentListComponent
  ]
})
export class SharedModule {}
