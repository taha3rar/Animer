import { Injectable, QueryList } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StepperNavigationService {
  activeGeneralStep = 0;
  activeInnerStep = 0;
  generalStepsList: HTMLCollection;
  innerStepsList: HTMLCollection;

  constructor() {}

  onNext() {
    if (this.activeInnerStep === this.innerStepsList.length - 1) {
      this.updateStatus('completed');
      this.activeGeneralStep = this.activeGeneralStep + 1;
      this.showStep('general');
      this.updateStatus('active');
    } else {
      this.activeInnerStep = this.activeInnerStep + 1;
      this.showStep();
    }
  }

  onPrevious() {
    if (this.activeInnerStep === 0) {
      this.activeGeneralStep = this.activeGeneralStep - 1;
      this.showStep('general');
    } else {
      this.activeInnerStep -= 1;
      this.showStep();
    }
  }

  showStep(generalStep?: string) {
    if (generalStep) {
      this.activeInnerStep = 0;
      $(this.generalStepsList[this.activeGeneralStep].children[0]).trigger('click');
    } else {
      $(this.innerStepsList[this.activeInnerStep].children[0]).trigger('click');
    }
  }

  updateStatus(status: string) {
    if (status === 'completed') {
      $(this.generalStepsList[this.activeGeneralStep]).addClass('completed');
    } else {
      $(this.generalStepsList[this.activeGeneralStep]).removeClass('disabled');
      $(this.generalStepsList[this.activeGeneralStep]).addClass('active');
    }
  }
}
