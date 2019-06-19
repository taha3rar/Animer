import { OrderComponent } from './order/order.component';
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrderDocumentsComponent } from './order-documents/order-documents.component';
import { OrderInvoiceComponent } from './order-invoice/order-invoice.component';
import { OrderPoComponent } from './order-po/order-po.component';
import { TranslateModule } from '@ngx-translate/core';
import { OrderRoutingModule } from './order-routing.module';
import { OrderListResolver } from './resolvers/order-list.resolver';
import { SharedModule } from '@app/shared';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '@app/shared/customization/ngb-date-parser-il-format';
import { NgxPermissionsModule } from 'ngx-permissions';
import { OrderGeneratorComponent } from './order-generator/order-generator.component';
import { OrderGeneratorSuppliersComponent } from './order-generator/order-generator-suppliers/order-generator-suppliers.component';
import { OrderGeneratorProductsComponent } from './order-generator/order-generator-products/order-generator-products.component';
import { OrderGeneratorPoComponent } from './order-generator/order-generator-po/order-generator-po.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
// tslint:disable-next-line:max-line-length
import { OrderGeneratorSummaryComponent } from './order-generator/order-generator-products/order-generator-summary/order-generator-summary.component';
import { OrderGeneratorReviewOrderComponent } from './order-generator/order-generator-review-order/order-generator-review-order.component';
import { OrderInvoiceGeneratorComponent } from './order-generator-seller/order-invoice-generator/order-invoice-generator.component';
import { OrderGeneratorSellerComponent } from './order-generator-seller/order-generator-seller.component';
import { OrderProductListComponent } from './order-generator/order-product-list/order-product-list.component';
// tslint:disable-next-line:max-line-length
import { OrderInvoiceProductListComponent } from './order-generator-seller/order-invoice-generator/order-invoice-product-list/order-invoice-product-list.component';
import { OrderDataService } from './order-generator/order-data.service';
import { CurrentUserSuppliersResolver } from '@app/shared/resolvers/current-user-suppliers.resolver';
import { CurrentUserResolver } from '../shared/resolvers/current-user.resolver';
import { OrderPoResolver } from './resolvers/order-po.resolver';
import { OrderInvoiceResolver } from './resolvers/order-invoice.resolver';
import { OrderDocumentsResolver } from './resolvers/order-documents.resolver';
import { OrderListAsBuyerResolver } from './resolvers/order-list-as-buyer.resolver';
import { OrderListAsSellerResolver } from './resolvers/order-list-as-seller.resolver';
import { RoundUpPipe } from '@app/shared/pipes/roundup.pipe';
import { TutorialsModule } from '@app/tutorials/tutorials.module';

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
    OrderGeneratorReviewOrderComponent,
    OrderGeneratorSellerComponent,
    OrderInvoiceGeneratorComponent,
    OrderProductListComponent,
    OrderInvoiceProductListComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    TranslateModule,
    OrderRoutingModule,
    NgbModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    TutorialsModule,
    NgxPermissionsModule.forRoot()
  ],
  providers: [
    OrderListResolver,
    OrderListAsBuyerResolver,
    OrderListAsSellerResolver,
    CurrentUserSuppliersResolver,
    CurrentUserResolver,
    OrderDataService,
    OrderPoResolver,
    OrderInvoiceResolver,
    OrderDocumentsResolver,
    RoundUpPipe,
    DecimalPipe,
    DatePipe,
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ]
})
export class OrderModule {}
