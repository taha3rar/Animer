import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersListComponent, RoundUpPipe } from './orders-list/orders-list.component';
import { OrderDocumentsComponent } from './order-documents/order-documents.component';
import { OrderInvoiceComponent } from './order-invoice/order-invoice.component';
import { OrderPoComponent } from './order-po/order-po.component';
import { TranslateModule } from '@ngx-translate/core';
import { OrderRoutingModule } from './order-routing.module';
import { OrderListResolver } from './resolvers/order-list.resolver';

@NgModule({
  declarations: [
    OrdersListComponent,
    OrderDocumentsComponent, // TODO: Check if it should be moved to a shared folder
    OrderInvoiceComponent, // TODO: Check if it should be moved to a shared folder
    OrderPoComponent,
    RoundUpPipe
  ],
  imports: [CommonModule, TranslateModule, OrderRoutingModule],
  providers: [OrderListResolver]
})
export class OrderModule {}
