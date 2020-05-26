import { SharedModule } from '@app/shared';
import { NgModule } from '@angular/core';
import { NgbModule, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './finance-routing.module';
import { FinanceListComponent } from './finance-list/finance-list.component';
import { LoanGeneratorComponent } from './loan-generator/loan-generator.component';
import { LoanDetailsComponent } from './loan-generator/loan-details/loan-details.component';
import { LoanAboutComponent } from './loan-generator/loan-details/loan-about/loan-about.component';
import { LoanGoalsComponent } from './loan-generator/loan-details/loan-goals/loan-goals.component';
import { BusinessDetailsComponent } from './loan-generator/business-details/business-details.component';
import { ApplicantDetailsComponent } from './loan-generator/applicant-details/applicant-details.component';
import { RefereeDetailsComponent } from './loan-generator/referee-details/referee-details.component';
import { BankDetailsComponent } from './loan-generator/bank-details/bank-details.component';
import { BusinessBasicDetailsComponent } from './loan-generator/business-details/business-basic-details/business-basic-details.component';
import { BusinessLocationComponent } from './loan-generator/business-details/business-location/business-location.component';
import { BusinessPremisesComponent } from './loan-generator/business-details/business-premises/business-premises.component';
import { BusinessOtherDetailsComponent } from './loan-generator/business-details/business-other-details/business-other-details.component';
// tslint:disable-next-line:max-line-length
import { BusinessFinancialDetailsComponent } from './loan-generator/business-details/business-financial-details/business-financial-details.component';
// tslint:disable-next-line:max-line-length
import { BusinessDirectorsDetailsComponent } from './loan-generator/business-details/business-directors-details/business-directors-details.component';
import { BusinessKeyPersonComponent } from './loan-generator/business-key-person/business-key-person.component';
import { BusinessKeyDetailsComponent } from './loan-generator/business-key-person/business-key-details/business-key-details.component';
import { BusinessKeyContactComponent } from './loan-generator/business-key-person/business-key-contact/business-key-contact.component';
import { BusinessKeyRoleComponent } from './loan-generator/business-key-person/business-key-role/business-key-role.component';
// tslint:disable-next-line:max-line-length
import { BusinessKeyLocationComponent } from './loan-generator/business-key-person/business-key-location/business-key-location.component';
// tslint:disable-next-line:max-line-length
import { ApplicantPersonalInfoComponent } from './loan-generator/applicant-details/applicant-personal-info/applicant-personal-info.component';
import { ApplicantLocationComponent } from './loan-generator/applicant-details/applicant-location/applicant-location.component';
import { ApplicantPostalComponent } from './loan-generator/applicant-details/applicant-postal/applicant-postal.component';
// tslint:disable-next-line:max-line-length
import { ApplicantContactDetailsComponent } from './loan-generator/applicant-details/applicant-contact-details/applicant-contact-details.component';
// tslint:disable-next-line:max-line-length
import { ApplicantContactPropertiesComponent } from './loan-generator/applicant-details/applicant-contact-properties/applicant-contact-properties.component';
import { RefereeFirstComponent } from './loan-generator/referee-details/referee-first/referee-first.component';
import { RefereeSecondComponent } from './loan-generator/referee-details/referee-second/referee-second.component';
import { ApplicantBankDetailsComponent } from './loan-generator/bank-details/applicant-bank-details/applicant-bank-details.component';
import { ApplicantOtherLoansComponent } from './loan-generator/bank-details/applicant-other-loans/applicant-other-loans.component';
import { ApplicantCardsComponent } from './loan-generator/bank-details/applicant-cards/applicant-cards.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatSliderModule } from '@angular/material';
import { QualifcationToolComponent } from './loan-generator/qualifcation-tool/qualifcation-tool.component';
import { LoanComponent } from './loan/loan.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FinanceListResolver } from './resolvers/finance-list.resolver';
import { LoanResolver } from './resolvers/loan.resolver';
import { CustomAdapter, CustomDateParserFormatter } from './loan-generator/loan-navigation.component';

@NgModule({
  declarations: [
    FinanceListComponent,
    LoanGeneratorComponent,
    LoanDetailsComponent,
    LoanGoalsComponent,
    LoanAboutComponent,
    BusinessDetailsComponent,
    ApplicantDetailsComponent,
    RefereeDetailsComponent,
    BankDetailsComponent,
    BusinessBasicDetailsComponent,
    BusinessLocationComponent,
    BusinessPremisesComponent,
    BusinessOtherDetailsComponent,
    ApplicantPersonalInfoComponent,
    ApplicantLocationComponent,
    ApplicantPostalComponent,
    ApplicantContactDetailsComponent,
    ApplicantContactPropertiesComponent,
    RefereeFirstComponent,
    RefereeSecondComponent,
    ApplicantBankDetailsComponent,
    ApplicantOtherLoansComponent,
    ApplicantCardsComponent,
    QualifcationToolComponent,
    LoanComponent,
    BusinessFinancialDetailsComponent,
    BusinessDirectorsDetailsComponent,
    BusinessKeyPersonComponent,
    BusinessKeyDetailsComponent,
    BusinessKeyContactComponent,
    BusinessKeyRoleComponent,
    BusinessKeyLocationComponent
  ],
  entryComponents: [],

  imports: [
    CommonModule,
    ProductRoutingModule,
    CdkStepperModule,
    SharedModule,
    MatSliderModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule
  ],
  providers: [
    FinanceListResolver,
    LoanResolver,
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class FinanceModule {}
