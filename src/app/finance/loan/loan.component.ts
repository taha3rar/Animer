import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoanGeneratorDataService } from '../loan-generator/loan-generator-data.service';
import { StepperNavigationService } from '../loan-generator/stepper-navigation.service';
import { CreateLoanDTO } from '@avenews/agt-sdk';
import { SdkService } from '@app/core/sdk.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {
  applicationCompleted = true;
  loanSubmitted = false;
  loan_form: FormGroup;
  loan: CreateLoanDTO;
  @Output() actionOnPreview = new EventEmitter<boolean>();

  constructor(
    private loanGeneratorDataService: LoanGeneratorDataService,
    private stepperNavigationService: StepperNavigationService,
    private sdkService: SdkService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ submittedLoan }) => {
      if (submittedLoan) {
        this.loan = submittedLoan;
        this.loanSubmitted = true;
      }
    });
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

  submitLoan() {
    this.sdkService
      .submitLoanApplication(this.loan)
      .then(loan => {
        this.router.navigate(['finance']);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
