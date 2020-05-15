import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CsvService } from './services/csv.service';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoaderComponent } from './loader/loader.component';
import { RoundUpPipe } from './pipes/roundup.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseListComponent } from './components/base-list/base-list.component';
import { GooglePlacesDirective } from './directives/google-places.directive';
import { BaseNavigationComponent } from './components/base-navigation/base-navigation.component';
import { UploadPictureComponent } from './components/upload-picture/upload-picture.component';
import { UserDocumentComponent } from './components/document-list/user-document-list/user-document-list.component';
import { TransactionDocumentListComponent } from './components/document-list/transaction-document-list/transaction-document-list.component';
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
    MatSortModule
  ],
  declarations: [
    LoaderComponent,
    RoundUpPipe,
    DateStringPipe,
    StatusPipe,
    TransactionDocumentListComponent,
    UserDocumentComponent,
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
    ContactGeneratorComponent,
    UserProgressComponent,
    DpoDocumentsComponent
  ],
  entryComponents: [],
  exports: [
    LoaderComponent,
    RoundUpPipe,
    DateStringPipe,
    MultiProductPipe,
    TransactionDocumentListComponent,
    ProductQuantityPipe,
    UserDocumentComponent,
    UploadPictureComponent,
    TutorialControlComponent,
    ContactGeneratorComponent,
    UserProgressComponent,
    FilterPipe,
    StatusPipe,
    DpoDocumentsComponent
  ],
  providers: [CsvService, DatePipe]
})
export class SharedModule {}
