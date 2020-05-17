import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoanNavigationComponent } from '../loan-navigation.component';
import { StepperNavigationService } from '../stepper-navigation.service';
import { SdkService } from '@app/core/sdk.service';
import { LoanGeneratorDataService } from '../loan-generator-data.service';

@Component({
  selector: 'app-referee-details',
  templateUrl: './referee-details.component.html',
  styleUrls: ['./referee-details.component.scss']
})
export class RefereeDetailsComponent extends LoanNavigationComponent implements OnInit, AfterViewInit {
  constructor(
    stepperNavigationService: StepperNavigationService,
    sdkService: SdkService,
    loanGeneratorDataService: LoanGeneratorDataService
  ) {
    super(3, stepperNavigationService, sdkService, loanGeneratorDataService);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }
}
