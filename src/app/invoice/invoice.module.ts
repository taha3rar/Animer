import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesListComponent } from './invoices-list/invoices-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceListResolver } from './resolvers/invoice-list.resolver';
import { InvoiceComponent } from './invoice/invoice.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceGeneratorComponent } from './invoice-generator/invoice-generator.component';
import { InvoiceGeneratorBuyersComponent } from './invoice-generator/invoice-generator-buyers/invoice-generator-buyers.component';
import { InvoiceGeneratorInvoiceComponent } from './invoice-generator/invoice-generator-invoice/invoice-generator-invoice.component';
import { InvoiceInventoryComponent } from './invoice-generator/invoice-generator-invoice/invoice-inventory/invoice-inventory.component';
// tslint:disable-next-line:max-line-length
import { InvoiceAgriculturalProductComponent } from './invoice-generator/invoice-generator-invoice/invoice-agricultural-product/invoice-agricultural-product.component';
// tslint:disable-next-line:max-line-length
import { InvoiceProcessedProductComponent } from './invoice-generator/invoice-generator-invoice/invoice-processed-product/invoice-processed-product.component';
import { InvoiceBuyersResolver } from './resolvers/invoice-buyers.resolver';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoiceSellerResolver } from './resolvers/invoice-seller.resolver';
import { InvoiceResolver } from './resolvers/invoice.resolver';
import { ProductCurrentUserResolver } from './resolvers/products-currentUser.resolver';

@NgModule({
  declarations: [
    InvoicesListComponent,
    InvoiceComponent,
    InvoiceGeneratorComponent,
    InvoiceGeneratorBuyersComponent,
    InvoiceGeneratorInvoiceComponent,
    InvoiceInventoryComponent,
    InvoiceAgriculturalProductComponent,
    InvoiceProcessedProductComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    InvoiceRoutingModule,
    SharedModule,
    NgbModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [InvoiceListResolver, InvoiceBuyersResolver, InvoiceSellerResolver, InvoiceResolver, ProductCurrentUserResolver]
})
export class InvoiceModule {}
