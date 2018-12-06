import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrderDocumentsComponent } from './order-documents/order-documents.component';
import { OrderInvoiceComponent } from './order-invoice/order-invoice.component';
import { OrderPoComponent } from './order-po/order-po.component';

@NgModule({
  declarations: [
    OrdersListComponent,
    OrderDocumentsComponent, // TODO: Check if it should be moved to a shared folder
    OrderInvoiceComponent, // TODO: Check if it should be moved to a shared folder
    OrderPoComponent
  ],
  imports: [CommonModule]
})
export class OrderModule {}
