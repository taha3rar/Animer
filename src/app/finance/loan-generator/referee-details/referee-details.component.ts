import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { LoanNavigationComponent } from '../loan-navigation.component';
import { StepperNavigationService } from '../stepper-navigation.service';

@Component({
  selector: 'app-referee-details',
  templateUrl: './referee-details.component.html',
  styleUrls: ['./referee-details.component.scss']
})
export class RefereeDetailsComponent extends LoanNavigationComponent implements OnInit, AfterViewInit {
  constructor(@Inject(StepperNavigationService) stepperNavigationService: StepperNavigationService) {
    super(3, stepperNavigationService);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }
}
