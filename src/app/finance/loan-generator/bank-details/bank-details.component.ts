import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { LoanNavigationComponent } from '../loan-navigation.component';
import { StepperNavigationService } from '../stepper-navigation.service';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent extends LoanNavigationComponent implements OnInit, AfterViewInit {
  constructor(@Inject(StepperNavigationService) stepperNavigationService: StepperNavigationService) {
    super(4, stepperNavigationService);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }
}
