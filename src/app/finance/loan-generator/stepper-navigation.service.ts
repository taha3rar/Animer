import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoanGeneratorDataService } from './loan-generator-data.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StepperNavigationService {
  loan_form: FormGroup;
  activeGeneralStepSource = new BehaviorSubject(0);
  activeInnerStepSource = new BehaviorSubject(0);
  currentActiveGeneralStep = this.activeGeneralStepSource.asObservable();
  currentActiveInnerStep = this.activeInnerStepSource.asObservable();
  stepDictionnary = new Array();

  constructor(private loanGeneratorDataService: LoanGeneratorDataService) {
    this.loanGeneratorDataService.currentForm.subscribe(form => {
      this.loan_form = form;
    });
  }

  setGeneralStepsNumber(generalStepsNumber: number): void {
    this.stepDictionnary = new Array(generalStepsNumber);
  }

  setInnerStepsNumber(generalStepId: number, innerStepsNumber: number): void {
    this.stepDictionnary[generalStepId] = innerStepsNumber;
  }

  onNext(): void {
    if (this.activeInnerStepSource.getValue() === this.stepDictionnary[this.activeGeneralStepSource.getValue()]) {
      if (this.stepDictionnary[this.activeGeneralStepSource.getValue() + 1]) {
        this.activeGeneralStepSource.next(this.activeGeneralStepSource.getValue() + 1);
      } else {
        this.activeGeneralStepSource.next(this.activeGeneralStepSource.getValue() + 2);
      }
      this.activeInnerStepSource.next(0);
    } else {
      this.activeInnerStepSource.next(this.activeInnerStepSource.getValue() + 1);
    }
  }

  onPrevious(): void {
    if (this.activeInnerStepSource.getValue() === 0) {
      if (this.stepDictionnary[this.activeGeneralStepSource.getValue() - 1]) {
        this.activeGeneralStepSource.next(this.activeGeneralStepSource.getValue() - 1);
      } else {
        this.activeGeneralStepSource.next(this.activeGeneralStepSource.getValue() - 2);
      }
      this.activeInnerStepSource.next(this.stepDictionnary[this.activeGeneralStepSource.getValue()]);
    } else {
      this.activeInnerStepSource.next(this.activeInnerStepSource.getValue() - 1);
    }
  }

  manuallySetStep(generalStep: number) {
    this.activeGeneralStepSource.next(generalStep);
    this.activeInnerStepSource.next(0);
  }

  flushSteps() {
    this.activeGeneralStepSource.next(0);
    this.activeInnerStepSource.next(0);
  }
}
