import { MeasurementPipe } from './pipes/measurement.pipe';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CsvService } from './services/csv.service';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoaderComponent } from './loader/loader.component';
import { RoundUpPipe } from './pipes/roundup.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseListComponent } from './components/base-list/base-list.component';
import { GooglePlacesDirective } from './directives/google-places.directive';
import { BaseNavigationComponent } from './components/base-navigation/base-navigation.component';
import { UploadPictureComponent } from './components/upload-picture/upload-picture.component';
import { TutorialControlComponent } from './components/tutorial-control/tutorial-control.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UnauthorizedPageComponent } from './components/unauthorized-page/unauthorized-page.component';
import { MatSortModule } from '@angular/material';
import { FilterPipe } from '@app/shared/pipes/filter.pipe';
import { ContactGeneratorComponent } from './components/contact-generator/contact-generator.component';
import { UserProgressComponent } from './components/user-progress/user-progress.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { DpoDocumentsComponent } from './components/document-list/dpo-documents/dpo-documents.component';
import { StatusPipe } from './pipes/status.pipe';
import { MultiProductPipe } from './pipes/multi-products.pipe';
import { ProductQuantityPipe } from './pipes/product-quantity.pipe';
import { DateStringPipe } from './pipes/date-string.pipe';
import { PaymentStatusPipe } from './pipes/paymentStatus.pipe';
import { ReferenceCodePipe } from './pipes/referenceCode.pipe';
import { PluralPipe } from './pipes/plural.pipe';
import { TransactionDocumentListComponent } from './components/document-list/transaction-document-list/transaction-document-list.component';
import { NumberFormatPipe } from './pipes/number-format.pipe';
import { NotPaidPipe } from './pipes/not-paid.pipe';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    NgbModule,
    RouterModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forRoot(),
    ProgressbarModule.forRoot(),
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
  ],
  declarations: [
    LoaderComponent,
    RoundUpPipe,
    DateStringPipe,
    MeasurementPipe,
    StatusPipe,
    ReferenceCodePipe,
    BaseNavigationComponent,
    BaseListComponent,
    GooglePlacesDirective,
    UploadPictureComponent,
    TutorialControlComponent,
    NotFoundComponent,
    UnauthorizedPageComponent,
    FilterPipe,
    MultiProductPipe,
    ProductQuantityPipe,
    PluralPipe,
    NotPaidPipe,
    ContactGeneratorComponent,
    UserProgressComponent,
    DpoDocumentsComponent,
    PaymentStatusPipe,
    TransactionDocumentListComponent,
    NumberFormatPipe,
  ],
  entryComponents: [],
  exports: [
    LoaderComponent,
    RoundUpPipe,
    DateStringPipe,
    MultiProductPipe,
    MeasurementPipe,
    ProductQuantityPipe,
    UploadPictureComponent,
    TutorialControlComponent,
    ContactGeneratorComponent,
    UserProgressComponent,
    FilterPipe,
    NotPaidPipe,
    StatusPipe,
    PluralPipe,
    DpoDocumentsComponent,
    PaymentStatusPipe,
    ReferenceCodePipe,
    NumberFormatPipe,
    TransactionDocumentListComponent,
  ],
  providers: [CsvService, DatePipe, DecimalPipe],
})
export class SharedModule {}
