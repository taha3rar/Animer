import { AfterViewInit, ViewChild, ElementRef, AfterContentChecked, Inject, Injectable } from '@angular/core';
import { StepperNavigationService } from './stepper-navigation.service';
import { CreateLoanDTO } from '@avenews/agt-sdk';
import { SdkService } from '@app/core/sdk.service';
import { LoanGeneratorDataService } from './loan-generator-data.service';
import { FormGroup } from '@angular/forms';
import { NgbDateAdapter, NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}

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
    this.sdkService
      .saveLoanApplication(this.loan)
      .then(loan => {
        this.loan_form.get('_id').setValue({
          _id: loan._id
        });
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
