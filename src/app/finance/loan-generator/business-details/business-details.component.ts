import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoanNavigationComponent } from '../loan-navigation.component';
import { StepperNavigationService } from '../stepper-navigation.service';
import { SdkService } from '@app/core/sdk.service';
import { LoanGeneratorDataService } from '../loan-generator-data.service';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.scss']
})
export class BusinessDetailsComponent extends LoanNavigationComponent implements OnInit, AfterViewInit {
  constructor(
    stepperNavigationService: StepperNavigationService,
    sdkService: SdkService,
    loanGeneratorDataService: LoanGeneratorDataService
  ) {
    super(1, stepperNavigationService, sdkService, loanGeneratorDataService);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  get businessType() {
    return this.loan.qualification.businessType;
  }
}
