import { StepperNavigationService } from './../stepper-navigation.service';
import { StepperService } from '@app/core/forms/stepper.service';
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.scss']
})
export class LoanDetailsComponent implements OnInit {
  @ViewChild('loanDetailStepper') loanDetailStepper: ElementRef<HTMLElement>;

  constructor(private stepperNavigation: StepperNavigationService) {}

  ngOnInit() {}

  onNext() {
    this.stepperNavigation.innerStepsList = this.loanDetailStepper.nativeElement.children;
    this.stepperNavigation.onNext();
  }
}
