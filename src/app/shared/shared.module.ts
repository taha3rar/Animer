import { RouterModule } from '@angular/router';
import { CsvService } from './services/csv.service';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoaderComponent } from './loader/loader.component';
import { RoundUpPipe } from './pipes/roundup.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderListComponent } from './components/order-list/order-list.component';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { UserDataComponent } from './components/user-data/user-data.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { BaseListComponent } from './components/base-list/base-list.component';
import { GooglePlacesDirective } from './directives/google-places.directive';
import { BaseNavigationComponent } from './components/base-navigation/base-navigation.component';
import { UploadPictureComponent } from './components/upload-picture/upload-picture.component';
import { BaseValidationComponent } from './components/base-validation/base-validation.component';
import { UserDocumentComponent } from './components/document-list/user-document-list/user-document-list.component';
import { TransactionDocumentListComponent } from './components/document-list/transaction-document-list/transaction-document-list.component';
import { DocumentGeneratorComponent } from './components/document-generator/document-generator.component';
import { TutorialControlComponent } from './components/tutorial-control/tutorial-control.component';

@NgModule({
  imports: [CommonModule, NgxPaginationModule, NgbModule, RouterModule, MatTooltipModule],
  declarations: [
    LoaderComponent,
    RoundUpPipe,
    InvoiceListComponent,
    OrderListComponent,
    TransactionsListComponent,
    TransactionDocumentListComponent,
    UserDataComponent,
    UserDocumentComponent,
    BaseNavigationComponent,
    BaseValidationComponent,
    BaseListComponent,
    GooglePlacesDirective,
    UploadPictureComponent,
    DocumentGeneratorComponent,
    TutorialControlComponent
  ],
  exports: [
    LoaderComponent,
    RoundUpPipe,
    InvoiceListComponent,
    OrderListComponent,
    TransactionsListComponent,
    TransactionDocumentListComponent,
    UserDataComponent,
    UserDocumentComponent,
    UploadPictureComponent,
    DocumentGeneratorComponent,
    TutorialControlComponent
  ],
  providers: [CsvService, DatePipe]
})
export class SharedModule {}
