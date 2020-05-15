import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoanNavigationComponent } from '../loan-navigation.component';
import { StepperNavigationService } from '../stepper-navigation.service';
import { SdkService } from '@app/core/sdk.service';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.scss']
})
export class BusinessDetailsComponent extends LoanNavigationComponent implements OnInit, AfterViewInit {
  constructor(stepperNavigationService: StepperNavigationService, sdkService: SdkService) {
    super(1, stepperNavigationService, sdkService);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }
}
