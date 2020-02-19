import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { LoanNavigationComponent } from '../loan-navigation.component';
import { StepperNavigationService } from '../stepper-navigation.service';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.scss']
})
export class LoanDetailsComponent extends LoanNavigationComponent implements OnInit, AfterViewInit {
  @ViewChild('loanDetailStepper') loanDetailStepper: ElementRef<HTMLElement>;

  constructor(stepperNavigationService: StepperNavigationService) {
    super(0, stepperNavigationService);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }
}
