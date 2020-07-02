import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { LoanNavigationComponent } from '../loan-navigation.component';
import { StepperNavigationService } from '../stepper-navigation.service';
import { SdkService } from '@app/core/sdk.service';
import { LoanGeneratorDataService } from '../loan-generator-data.service';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.scss']
})
export class LoanDetailsComponent extends LoanNavigationComponent implements OnInit, AfterViewInit {
  @ViewChild('loanDetailStepper') loanDetailStepper: ElementRef<HTMLElement>;

  constructor(
    stepperNavigationService: StepperNavigationService,
    sdkService: SdkService,
    loanGeneratorDataService: LoanGeneratorDataService
  ) {
    super(0, stepperNavigationService, sdkService, loanGeneratorDataService);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }
}