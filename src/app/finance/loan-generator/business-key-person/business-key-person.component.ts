import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoanNavigationComponent } from '../loan-navigation.component';
import { StepperNavigationService } from '../stepper-navigation.service';
import { countries } from '@app/shared/helpers/countries';
import { LoanGeneratorDataService } from '../loan-generator-data.service';
import { SdkService } from '@app/core/sdk.service';

@Component({
  selector: 'app-business-key-person',
  templateUrl: './business-key-person.component.html',
  styleUrls: ['./business-key-person.component.scss']
})
export class BusinessKeyPersonComponent extends LoanNavigationComponent implements OnInit, AfterViewInit {
  countries = countries;
  isLimitedCompany: boolean;

  constructor(
    stepperNavigationService: StepperNavigationService,
    sdkService: SdkService,
    loanGeneratorDataService: LoanGeneratorDataService
  ) {
    super(3, stepperNavigationService, sdkService, loanGeneratorDataService);
  }

  ngOnInit() {
    this.isLimitedCompany = this.loan.qualification.businessType === 'limited company';
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }
}
