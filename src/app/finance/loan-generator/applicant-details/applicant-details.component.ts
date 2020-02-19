import { StepperNavigationService } from './../stepper-navigation.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoanNavigationComponent } from '../loan-navigation.component';

@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.scss']
})
export class ApplicantDetailsComponent extends LoanNavigationComponent implements OnInit, AfterViewInit {
  constructor(stepperNavigationService: StepperNavigationService) {
    super(2, stepperNavigationService);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }
}
