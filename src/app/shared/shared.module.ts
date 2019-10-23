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
import { OrderListComponent } from './components/order-list/order-list.component';
import { UserDataComponent } from './components/user-data/user-data.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { QuoteRequestListComponent } from './components/quote-request-list/quote-request-list.component';
import { BaseListComponent } from './components/base-list/base-list.component';
import { GooglePlacesDirective } from './directives/google-places.directive';
import { BaseNavigationComponent } from './components/base-navigation/base-navigation.component';
import { UploadPictureComponent } from './components/upload-picture/upload-picture.component';
import { UserDocumentComponent } from './components/document-list/user-document-list/user-document-list.component';
import { TransactionDocumentListComponent } from './components/document-list/transaction-document-list/transaction-document-list.component';
import { DocumentGeneratorComponent } from './components/document-generator/document-generator.component';
import { TutorialControlComponent } from './components/tutorial-control/tutorial-control.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UnauthorizedPageComponent } from './components/unauthorized-page/unauthorized-page.component';
// tslint:disable-next-line:max-line-length
import { ModalAgriculturalProductComponent } from './components/products/modal-agricultural-product/modal-agricultural-product.component';
// tslint:disable-next-line:max-line-length
import { ModalProcessedProductComponent } from './components/products/modal-processed-product/modal-processed-product.component';
import { DocumentDownloadComponent } from './components/document-download/document-download.component';
import { ModalInventoryComponent } from './components/products/modal-inventory/modal-inventory.component';
import { MatSortModule } from '@angular/material';
import { FilterPipe } from '@app/shared/pipes/filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    NgbModule,
    RouterModule,
    ProgressbarModule.forRoot(),
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule
  ],
  declarations: [
    LoaderComponent,
    RoundUpPipe,
    InvoiceListComponent,
    OrderListComponent,
    QuoteRequestListComponent,
    TransactionDocumentListComponent,
    UserDataComponent,
    UserDocumentComponent,
    BaseNavigationComponent,
    BaseListComponent,
    GooglePlacesDirective,
    UploadPictureComponent,
    DocumentGeneratorComponent,
    TutorialControlComponent,
    NotFoundComponent,
    UnauthorizedPageComponent,
    ModalAgriculturalProductComponent,
    ModalProcessedProductComponent,
    ModalInventoryComponent,
    FilterPipe
  ],
  entryComponents: [ModalAgriculturalProductComponent, ModalProcessedProductComponent, ModalInventoryComponent],
  exports: [
    LoaderComponent,
    RoundUpPipe,
    InvoiceListComponent,
    OrderListComponent,
    QuoteRequestListComponent,
    TransactionDocumentListComponent,
    UserDataComponent,
    UserDocumentComponent,
    UploadPictureComponent,
    DocumentGeneratorComponent,
    TutorialControlComponent,
    ModalInventoryComponent,
    FilterPipe
  ],
  providers: [CsvService, DatePipe]
})
export class SharedModule {}
