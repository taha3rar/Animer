import { StepperNavigationService } from './../stepper-navigation.service';
import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { LoanNavigationComponent } from '../loan-navigation.component';
import { SdkService } from '@app/core/sdk.service';
import { LoanGeneratorDataService } from '../loan-generator-data.service';

@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.scss']
})
export class ApplicantDetailsComponent extends LoanNavigationComponent implements OnInit, AfterViewInit {
  constructor(
    stepperNavigationService: StepperNavigationService,
    sdkService: SdkService,
    loanGeneratorDataService: LoanGeneratorDataService
  ) {
    super(2, stepperNavigationService, sdkService, loanGeneratorDataService);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }
}
