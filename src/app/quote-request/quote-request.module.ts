import { SharedModule } from '@app/shared';
// tslint:disable-next-line:max-line-length
import { QuotationGeneratorQuotationComponent } from './quotation-generator/quotation-generator-quotation/quotation-generator-quotation.component';
import { QuotationGeneratorComponent } from './quotation-generator/quotation-generator.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QuoteRequestRoutingModule } from './quote-request-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteRequestsListComponent } from './quote-requests-list/quote-requests-list.component';
import { QuoteRequestGeneratorComponent } from './quote-request-generator/quote-request-generator.component';
// tslint:disable-next-line:max-line-length
import { QuoteRequestGeneratorFormComponent } from './quote-request-generator/quote-request-generator-form/quote-request-generator-form.component';
// tslint:disable-next-line:max-line-length
import { QuoteRequestComponent } from './quote-request/quote-request.component';
// tslint:disable-next-line:max-line-length
import { QuoteRequestGeneratorSuppliersComponent } from './quote-request-generator/quote-request-generator-suppliers/quote-request-generator-suppliers.component';
import { RouterModule } from '@angular/router';
// tslint:disable-next-line:max-line-length
import { QrAgriculturalProductComponent } from './quote-request-generator/quote-request-generator-form/qr-agricultural-product/qr-agricultural-product.component';
// tslint:disable-next-line:max-line-length
import { QrProcessedProductComponent } from './quote-request-generator/quote-request-generator-form/qr-processed-product/qr-processed-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPermissionsModule } from 'ngx-permissions';
import { QuotationViewComponent } from './quotation-view/quotation-view.component';
import { QuoteRequestClientsResolver } from './resolvers/quote-request-clients.resolver';
import { QuoteRequestEcosystemsResolver } from './resolvers/quote-request-ecosystems.resolver';
import { QuoteRequestUserResolver } from './resolvers/quote-request-user.resolver';
import { QuoteRequestListResolver } from './resolvers/quote-request-list.resolver';
import { QuoteRequestDataService } from './quote-request-generator/quote-request-data.service';
import { QuoteRequestResolver } from './resolvers/quote-request.resolver';
import { QuoteRequestViewComponent } from './quote-request-view/quote-request-view.component';
import { QuotationsListComponent } from './quote-request-view/quotations-list/quotations-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { QuotationComponent } from './quotation/quotation.component';
import { QuoteRequestQuotationResolver } from './resolvers/quote-request-quotation.resolver';

@NgModule({
  declarations: [
    QuoteRequestsListComponent,
    QuoteRequestGeneratorComponent,
    QuoteRequestGeneratorFormComponent,
    QuoteRequestGeneratorSuppliersComponent,
    QrAgriculturalProductComponent,
    QrProcessedProductComponent,
    QuotationViewComponent,
    QuotationGeneratorComponent,
    QuotationGeneratorQuotationComponent,
    QuoteRequestViewComponent,
    QuotationsListComponent,
    QuoteRequestComponent,
    QuotationComponent
  ],

  entryComponents: [QrAgriculturalProductComponent, QrProcessedProductComponent, QuotationComponent],

  imports: [
    SharedModule,
    CommonModule,
    NgxPaginationModule,
    MatTooltipModule,
    NgbModule,
    ReactiveFormsModule,
    QuoteRequestRoutingModule,
    RouterModule,
    NgxPermissionsModule.forRoot(),
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    QuoteRequestClientsResolver,
    QuoteRequestEcosystemsResolver,
    QuoteRequestUserResolver,
    QuoteRequestDataService,
    QuoteRequestListResolver,
    QuoteRequestResolver,
    QuoteRequestQuotationResolver
  ]
})
export class QuoteRequestModule {}
