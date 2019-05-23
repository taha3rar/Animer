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
import { QuoteRequestGeneratorReviewComponent } from './quote-request-generator/quote-request-generator-review/quote-request-generator-review.component';
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

@NgModule({
  declarations: [
    QuoteRequestsListComponent,
    QuoteRequestGeneratorComponent,
    QuoteRequestGeneratorFormComponent,
    QuoteRequestGeneratorReviewComponent,
    QuoteRequestGeneratorSuppliersComponent,
    QrAgriculturalProductComponent,
    QrProcessedProductComponent,
    QuotationViewComponent
    QuotationGeneratorComponent,
    QuotationGeneratorQuotationComponent
  ],

  entryComponents: [QrAgriculturalProductComponent, QrProcessedProductComponent],

  imports: [
    SharedModule,
    CommonModule,
    MatTooltipModule,
    NgbModule,
    ReactiveFormsModule,
    QuoteRequestRoutingModule,
    RouterModule,
    NgxPermissionsModule.forRoot(),
    FormsModule
  ]
})
export class QuoteRequestModule {}
