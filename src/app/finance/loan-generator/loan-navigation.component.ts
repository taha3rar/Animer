import { AfterViewInit, ViewChild, ElementRef, AfterContentChecked, Inject } from '@angular/core';
import { StepperNavigationService } from './stepper-navigation.service';

export class LoanNavigationComponent implements AfterViewInit, AfterContentChecked {
  @ViewChild('listStepDetails') stepperDetails: ElementRef<HTMLElement>;
  currentInnerStep: number;
  currentGeneralStep: number;

  constructor(private generalStepId: number, private stepperNavigationService: StepperNavigationService) {}

  ngAfterContentChecked() {
    this.stepperNavigationService.currentActiveInnerStep.subscribe(currentStep => {
      this.currentInnerStep = currentStep;
    });
  }

  ngAfterViewInit() {
    this.stepperNavigationService.setInnerStepsNumber(
      this.generalStepId,
      this.stepperDetails.nativeElement.children.length - 1
    );
  }

  displayStep(stepNumber: number) {
    return this.currentInnerStep === stepNumber;
  }

  onNext() {
    this.stepperNavigationService.onNext();
  }

  onPrevious() {
    this.stepperNavigationService.onPrevious();
  }
}