import { StepperNavigationService } from './../stepper-navigation.service';
import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { LoanNavigationComponent } from '../loan-navigation.component';
import { SdkService } from '@app/core/sdk.service';

@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.scss']
})
export class ApplicantDetailsComponent extends LoanNavigationComponent implements OnInit, AfterViewInit {
  constructor(stepperNavigationService: StepperNavigationService, sdkService: SdkService) {
    super(2, stepperNavigationService, sdkService);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }
}
