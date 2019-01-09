import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { RoundUpPipe } from './pipes/roundup.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderListComponent } from './components/order-list/order-list.component';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { UserDataComponent } from './components/user-data/user-data.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
<<<<<<< HEAD
import { RouterModule } from '@angular/router';
import { BaseListComponent } from './components/base-list/base-list.component';
=======
import { InvoicesComponent } from './components/invoices/invoices.component';
>>>>>>> order generator for  the seller and translation menu arrow direction

@NgModule({
  imports: [CommonModule, NgxPaginationModule, RouterModule],
  declarations: [
    LoaderComponent,
    RoundUpPipe,
    InvoiceListComponent,
    OrderListComponent,
    TransactionsListComponent,
    DocumentListComponent,
    UserDataComponent,
<<<<<<< HEAD
    BaseListComponent
=======
    InvoicesComponent
>>>>>>> order generator for  the seller and translation menu arrow direction
  ],
  exports: [
    LoaderComponent,
    RoundUpPipe,
    InvoiceListComponent,
    OrderListComponent,
    TransactionsListComponent,
    DocumentListComponent,
    UserDataComponent,
    InvoicesComponent
  ]
})
export class SharedModule {}
