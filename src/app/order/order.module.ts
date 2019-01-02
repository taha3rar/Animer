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
import { OrderGeneratorComponent } from './order-generator/order-generator.component';
import { OrderGeneratorSuppliersComponent } from './order-generator/order-generator-suppliers/order-generator-suppliers.component';
import { OrderGeneratorProductsComponent } from './order-generator/order-generator-products/order-generator-products.component';
import { OrderGeneratorPoComponent } from './order-generator/order-generator-po/order-generator-po.component';
import { FormsModule } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import { OrderGeneratorSummaryComponent } from './order-generator/order-generator-products/order-generator-summary/order-generator-summary.component';
import { OrderGeneratorReviewOrderComponent } from './order-generator/order-generator-review-order/order-generator-review-order.component';

@NgModule({
  declarations: [
    OrdersListComponent,
    OrderDocumentsComponent, // TODO: Check if it should be moved to a shared folder
    OrderInvoiceComponent, // TODO: Check if it should be moved to a shared folder
    OrderPoComponent,
    OrderComponent,
    OrderGeneratorComponent,
    OrderGeneratorSuppliersComponent,
    OrderGeneratorProductsComponent,
    OrderGeneratorPoComponent,
    OrderGeneratorSummaryComponent,
    OrderGeneratorReviewOrderComponent
  ],
  imports: [SharedModule, CommonModule, TranslateModule, OrderRoutingModule, NgbModule, FormsModule],
  providers: [OrderListResolver]
})
export class OrderModule {}
