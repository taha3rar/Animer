import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { LoanNavigationComponent } from '../loan-navigation.component';
import { StepperNavigationService } from '../stepper-navigation.service';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.scss']
})
export class BusinessDetailsComponent extends LoanNavigationComponent implements OnInit, AfterViewInit {
  constructor(@Inject(StepperNavigationService) stepperNavigationService: StepperNavigationService) {
    super(1, stepperNavigationService);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }
}
