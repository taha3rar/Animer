import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoanNavigationComponent } from '../loan-navigation.component';
import { StepperNavigationService } from '../stepper-navigation.service';
import { SdkService } from '@app/core/sdk.service';

@Component({
  selector: 'app-referee-details',
  templateUrl: './referee-details.component.html',
  styleUrls: ['./referee-details.component.scss']
})
export class RefereeDetailsComponent extends LoanNavigationComponent implements OnInit, AfterViewInit {
  constructor(stepperNavigationService: StepperNavigationService, sdkService: SdkService) {
    super(3, stepperNavigationService, sdkService);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }
}
