import { CaptchaComponent } from "./components/captcha/captcha.component";
import { MeasurementPipe } from "./pipes/measurement.pipe";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CsvService } from "./services/csv.service";
import { NgModule } from "@angular/core";
import { CommonModule, DatePipe, DecimalPipe } from "@angular/common";
import { MatTooltipModule } from "@angular/material/tooltip";
import { LoaderComponent } from "./loader/loader.component";
import { RoundUpPipe } from "./pipes/roundup.pipe";
import { NgxPaginationModule } from "ngx-pagination";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BaseListComponent } from "./components/base-list/base-list.component";
import { GooglePlacesDirective } from "./directives/google-places.directive";
import { BaseNavigationComponent } from "./components/base-navigation/base-navigation.component";
import { UploadPictureComponent } from "./components/upload-picture/upload-picture.component";
import { TutorialControlComponent } from "./components/tutorial-control/tutorial-control.component";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { UnauthorizedPageComponent } from "./components/unauthorized-page/unauthorized-page.component";
import { MatDatepickerModule, MatNativeDateModule, MatSliderModule, MatSortModule } from "@angular/material";
import { FilterPipe } from "@app/shared/pipes/filter.pipe";
import { ContactGeneratorComponent } from "./components/contact-generator/contact-generator.component";
import { UserProgressComponent } from "./components/user-progress/user-progress.component";
import { NgxPermissionsModule } from "ngx-permissions";
import { DpoDocumentsComponent } from "./components/document-list/dpo-documents/dpo-documents.component";
import { StatusPipe } from "./pipes/status.pipe";
import { MultiProductPipe } from "./pipes/multi-products.pipe";
import { ProductQuantityPipe } from "./pipes/product-quantity.pipe";
import { DateStringPipe } from "./pipes/date-string.pipe";
import { PaymentStatusPipe } from "./pipes/paymentStatus.pipe";
import { ReferenceCodePipe } from "./pipes/referenceCode.pipe";
import { PluralPipe } from "./pipes/plural.pipe";
import { TransactionDocumentListComponent } from "./components/document-list/transaction-document-list/transaction-document-list.component";
import { NumberFormatPipe } from "./pipes/number-format.pipe";
import { NotPaidPipe } from "./pipes/not-paid.pipe";
import { RecaptchaModule } from "ng-recaptcha";
import { GrnModalComponent } from "./components/grn-modal/grn-modal.component";
import { FarmerDetailsComponent } from "./components/contact-generator/farmer-details/farmer-details.component";
import { AdditionalDetailsComponent } from "./components/contact-generator/additional-details/additional-details.component";
import { NgbDateCustomParserFormatter } from "@app/shared/customization/ngb-date-parser-il-format";
import { EcosystemGeneratorComponent } from "./components/ecosystem-generator/ecosystem-generator.component";
import { OrgDetailsComponent } from "./components/ecosystem-generator/org-details/org-details.component";
import { LeadershipDetailsComponent } from "./components/ecosystem-generator/leadership-details/leadership-details.component";
import { AdditionalEcoDetailsComponent } from "./components/ecosystem-generator/additional-eco-details/additional-eco-details.component";
import { FormTestComponent } from "./components/forms/form-test/form-test.component";
import { FeatherModule } from "angular-feather";
import { Calendar, Plus, Check } from "angular-feather/icons";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatMenuModule } from "@angular/material/menu";
import { InputComponent } from "./components/forms/comp/input.component";
import { FloorPipe } from "./pipes/floor.pipe";
@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    NgbModule,
    RouterModule,
    MatMenuModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forRoot(),
    ProgressbarModule.forRoot(),
    MatTooltipModule,
    MatSliderModule,
    DragDropModule,
    FeatherModule.pick({ Calendar, Plus, Check }),
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RecaptchaModule,
    ReactiveFormsModule,
    MatSortModule,
  ],
  declarations: [
    LoaderComponent,
    InputComponent,
    RoundUpPipe,
    DateStringPipe,
    FloorPipe,
    MeasurementPipe,
    StatusPipe,
    ReferenceCodePipe,
    BaseNavigationComponent,
    BaseListComponent,
    GooglePlacesDirective,
    CaptchaComponent,
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
    GrnModalComponent,
    UserProgressComponent,
    DpoDocumentsComponent,
    PaymentStatusPipe,
    TransactionDocumentListComponent,
    NumberFormatPipe,
    FarmerDetailsComponent,
    AdditionalDetailsComponent,
    EcosystemGeneratorComponent,
    OrgDetailsComponent,
    LeadershipDetailsComponent,
    AdditionalEcoDetailsComponent,
    FormTestComponent,
  ],
  entryComponents: [],
  exports: [
    LoaderComponent,
    FloorPipe,
    RoundUpPipe,
    DateStringPipe,
    MultiProductPipe,
    MeasurementPipe,
    ProductQuantityPipe,
    UploadPictureComponent,
    AdditionalDetailsComponent,
    TutorialControlComponent,
    GrnModalComponent,
    ContactGeneratorComponent,
    UserProgressComponent,
    FilterPipe,
    NotPaidPipe,
    CaptchaComponent,
    StatusPipe,
    PluralPipe,
    EcosystemGeneratorComponent,
    DpoDocumentsComponent,
    PaymentStatusPipe,
    ReferenceCodePipe,
    NumberFormatPipe,
    TransactionDocumentListComponent,
    FarmerDetailsComponent,
  ],
  providers: [CsvService, DatePipe, DecimalPipe, MatNativeDateModule],
})
export class SharedModule {}
