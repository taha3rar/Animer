import { OrderComponent } from './order/order.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrderDocumentsComponent } from './order-documents/order-documents.component';
import { OrderInvoiceComponent } from './order-invoice/order-invoice.component';
import { OrderPoComponent } from './order-po/order-po.component';
import { TranslateModule } from '@ngx-translate/core';
import { OrderRoutingModule } from './order-routing.module';
import { OrderListResolver } from './resolvers/order-list.resolver';
import { SharedModule } from '@app/shared';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    OrdersListComponent,
    OrderDocumentsComponent, // TODO: Check if it should be moved to a shared folder
    OrderInvoiceComponent, // TODO: Check if it should be moved to a shared folder
    OrderPoComponent,
    OrderComponent
  ],
  imports: [CommonModule, TranslateModule, OrderRoutingModule, SharedModule, NgxPaginationModule, NgbModule],
  providers: [OrderListResolver]
})
export class OrderModule {}
