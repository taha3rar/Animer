import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { MatDialogModule, MatButtonModule, MatTooltipModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InvoicesListComponent } from './invoices-list/invoices-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceListResolver } from './resolvers/invoice-list.resolver';
import { InvoiceComponent } from './invoice/invoice.component';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '@app/shared/customization/ngb-date-parser-il-format';
import { NgxPermissionsModule } from 'ngx-permissions';
import { InvoiceGeneratorComponent } from './invoice-generator/invoice-generator.component';
import { InvoiceGeneratorBuyersComponent } from './invoice-generator/invoice-generator-buyers/invoice-generator-buyers.component';
import { InvoiceGeneratorInvoiceComponent } from './invoice-generator/invoice-generator-invoice/invoice-generator-invoice.component';
import { InvoiceBuyersResolver } from './resolvers/invoice-buyers.resolver';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrentUserResolver } from '../shared/resolvers/current-user.resolver';
import { InvoiceResolver } from './resolvers/invoice.resolver';
import { CurrentUserProductsResolver } from '@app/shared/resolvers/current-user-products.resolver';
// tslint:disable-next-line:max-line-length
import { InvoiceProductListComponent } from './invoice-generator/invoice-generator-invoice/invoice-product-list/invoice-product-list.component';
import { InvoiceListAsBuyerResolver } from './resolvers/invoice-list-as-buyer.resolver';
import { InvoiceListAsSellerResolver } from './resolvers/invoice-list-as-seller.resolver';
import { TutorialsModule } from '@app/tutorials/tutorials.module';
// tslint:disable-next-line:max-line-length

@NgModule({
  declarations: [
    InvoicesListComponent,
    InvoiceComponent,
    InvoiceGeneratorComponent,
    InvoiceGeneratorBuyersComponent,
    InvoiceGeneratorInvoiceComponent,
    InvoiceProductListComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    InvoiceRoutingModule,
    SharedModule,
    TutorialsModule,
    NgbModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    NgxPermissionsModule.forRoot()
  ],
  providers: [
    InvoiceListResolver,
    InvoiceListAsBuyerResolver,
    InvoiceListAsSellerResolver,
    InvoiceBuyersResolver,
    CurrentUserResolver,
    InvoiceResolver,
    CurrentUserProductsResolver,
    DecimalPipe,
    DatePipe,
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ]
})
export class InvoiceModule {}
