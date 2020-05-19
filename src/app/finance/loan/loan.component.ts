import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoanGeneratorDataService } from '../loan-generator/loan-generator-data.service';
import { StepperNavigationService } from '../loan-generator/stepper-navigation.service';
import { CreateLoanDTO } from '@avenews/agt-sdk';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {
  applicationCompleted = false;
  loan_form: FormGroup;
  loan: CreateLoanDTO;
  @Output() actionOnPreview = new EventEmitter<boolean>();

  constructor(
    private loanGeneratorDataService: LoanGeneratorDataService,
    private stepperNavigationService: StepperNavigationService
  ) {}

  ngOnInit() {
    this.loanGeneratorDataService.currentForm.subscribe(form => {
      if (form) {
        this.loan_form = form;
        this.loan = this.loan_form.value;
      }
    });
  }

  toGenerator(generalStep: number) {
    this.stepperNavigationService.manuallySetStep(generalStep);
    this.actionOnPreview.emit(false);
  }
}
