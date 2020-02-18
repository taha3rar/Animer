import { StepperNavigationService } from './../stepper-navigation.service';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-referee-details',
  templateUrl: './referee-details.component.html',
  styleUrls: ['./referee-details.component.scss']
})
export class RefereeDetailsComponent implements OnInit {
  currentStep = 1;
  @ViewChild('refereeStepper') refereeStepper: ElementRef;

  constructor(private stepperService: StepperNavigationService) {}

  ngOnInit() {}

  goNext() {
    this.stepperService.innerStepsList = this.refereeStepper.nativeElement.children;
    this.stepperService.onNext();
  }

  goBack() {
    this.stepperService.innerStepsList = this.refereeStepper.nativeElement.children;
    this.stepperService.onPrevious();
  }
}
