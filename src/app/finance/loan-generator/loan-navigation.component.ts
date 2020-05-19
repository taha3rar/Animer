import { AfterViewInit, ViewChild, ElementRef, AfterContentChecked, Inject } from '@angular/core';
import { StepperNavigationService } from './stepper-navigation.service';
import { CreateLoanDTO } from '@avenews/agt-sdk';
import { SdkService } from '@app/core/sdk.service';
import { LoanGeneratorDataService } from './loan-generator-data.service';
import { FormGroup } from '@angular/forms';

export class LoanNavigationComponent implements AfterViewInit, AfterContentChecked {
  @ViewChild('listStepDetails') stepperDetails: ElementRef<HTMLElement>;
  currentInnerStep: number;
  currentGeneralStep: number;
  loan_form: FormGroup;
  loan: CreateLoanDTO;

  constructor(
    private generalStepId: number,
    private stepperNavigationService: StepperNavigationService,
    private sdkService: SdkService,
    private loanGeneratorDataService: LoanGeneratorDataService
  ) {
    if (this.loanGeneratorDataService) {
      this.loanGeneratorDataService.currentForm.subscribe(form => {
        if (form) {
          this.loan_form = form;
          this.loan = this.loan_form.value;
        }
      });
    }
  }

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

  onSave() {
    console.log('Loan sent', this.loan);
    this.sdkService
      .saveLoanApplication(this.loan)
      .then(loan => {
        console.log('loan received', loan);
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  onNext() {
    this.onSave();
    this.stepperNavigationService.onNext();
  }

  onPrevious() {
    this.stepperNavigationService.onPrevious();
  }
}
