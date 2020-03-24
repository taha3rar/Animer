import { SharedModule } from '@app/shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './finance-routing.module';
import { FinanceListComponent } from './finance-list/finance-list.component';
import { LoanGeneratorComponent } from './loan-generator/loan-generator.component';
import { LoanDetailsComponent } from './loan-generator/loan-details/loan-details.component';
import { BusinessDetailsComponent } from './loan-generator/business-details/business-details.component';
import { ApplicantDetailsComponent } from './loan-generator/applicant-details/applicant-details.component';
import { RefereeDetailsComponent } from './loan-generator/referee-details/referee-details.component';
import { BankDetailsComponent } from './loan-generator/bank-details/bank-details.component';
import { BusinessBasicDetailsComponent } from './loan-generator/business-details/business-basic-details/business-basic-details.component';
import { BusinessLocationComponent } from './loan-generator/business-details/business-location/business-location.component';
import { BusinessPremisesComponent } from './loan-generator/business-details/business-premises/business-premises.component';
import { BusinessOtherDetailsComponent } from './loan-generator/business-details/business-other-details/business-other-details.component';
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

@NgModule({
  declarations: [
    FinanceListComponent,
    LoanGeneratorComponent,
    LoanDetailsComponent,
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
    LoanComponent
  ],
  entryComponents: [],

  imports: [CommonModule, ProductRoutingModule, CdkStepperModule, SharedModule, MatSliderModule, ReactiveFormsModule],
  providers: []
})
export class FinanceModule {}
