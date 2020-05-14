import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WBLoan } from '@app/core/models/finance/loans/wazesha-biashara/wazesha-biashara-loan';
import { LoanGeneratorDataService } from '../loan-generator/loan-generator-data.service';
import { StepperNavigationService } from '../loan-generator/stepper-navigation.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {
  applicationCompleted = false;
  loan_form: FormGroup;
  loan: WBLoan;
  @Output() actionOnPreview = new EventEmitter<boolean>();

  constructor(
    private loanGeneratorDataService: LoanGeneratorDataService,
    private stepperNavigationService: StepperNavigationService
  ) {}

  ngOnInit() {
    this.loanGeneratorDataService.currentForm.subscribe(form => {
      this.loan_form = form;
      this.loan = this.loan_form.value;
    });
  }

  toGenerator(generalStep: number) {
    this.stepperNavigationService.manuallySetStep(generalStep);
    this.actionOnPreview.emit(false);
  }
}
