import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoanNavigationComponent } from '../loan-navigation.component';
import { StepperNavigationService } from '../stepper-navigation.service';
import { countries } from '@app/shared/helpers/countries';

@Component({
  selector: 'app-business-key-person',
  templateUrl: './business-key-person.component.html',
  styleUrls: ['./business-key-person.component.scss']
})
export class BusinessKeyPersonComponent extends LoanNavigationComponent implements OnInit, AfterViewInit {
  countries = countries;

  constructor(stepperNavigationService: StepperNavigationService) {
    super(3, stepperNavigationService);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }
}
