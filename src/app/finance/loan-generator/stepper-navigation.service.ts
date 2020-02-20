import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepperNavigationService {
  activeGeneralStepSource = new BehaviorSubject(0);
  activeInnerStepSource = new BehaviorSubject(0);
  currentActiveGeneralStep = this.activeGeneralStepSource.asObservable();
  currentActiveInnerStep = this.activeInnerStepSource.asObservable();
  stepDictionnary = new Array();

  constructor() {}

  setGeneralStepsNumber(generalStepsNumber: number): void {
    this.stepDictionnary = new Array(generalStepsNumber);
  }

  setInnerStepsNumber(generalStepId: number, innerStepsNumber: number): void {
    this.stepDictionnary[generalStepId] = innerStepsNumber;
  }

  onNext(): void {
    if (this.activeInnerStepSource.getValue() === this.stepDictionnary[this.activeGeneralStepSource.getValue()]) {
      this.activeGeneralStepSource.next(this.activeGeneralStepSource.getValue() + 1);
      this.activeInnerStepSource.next(0);
    } else {
      this.activeInnerStepSource.next(this.activeInnerStepSource.getValue() + 1);
    }
  }

  onPrevious(): void {
    if (this.activeInnerStepSource.getValue() === 0) {
      this.activeGeneralStepSource.next(this.activeGeneralStepSource.getValue() - 1);
      this.activeInnerStepSource.next(this.stepDictionnary[this.activeGeneralStepSource.getValue()]);
    } else {
      this.activeInnerStepSource.next(this.activeInnerStepSource.getValue() - 1);
    }
  }
}
