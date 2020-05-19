import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoanGeneratorDataService } from '../../loan-generator-data.service';
import { CreateLoanDTO } from '@avenews/agt-sdk';
const pmt = require('formula-pmt');

@Component({
  selector: 'app-loan-about',
  templateUrl: './loan-about.component.html',
  styleUrls: ['./loan-about.component.scss']
})
export class LoanAboutComponent implements OnInit {
  loan_form: FormGroup;
  loan: CreateLoanDTO;
  loan_rate = 0.13;
  insurance_rate = 0.0065;
  expected_period_repayment: number;
  expected_total_repayment: number;

  constructor(private loanGeneratorDataService: LoanGeneratorDataService) {}

  ngOnInit() {
    this.loanGeneratorDataService.currentForm.subscribe(form => {
      if (form) {
        this.loan_form = form;
        this.loan = this.loan_form.value;
        this.validation();
        this.calculatePmt(this.loan.loanDetails.insureWithAbsa);
      }
    });
  }

  validation() {
    if (this.loan.loanDetails.amountRequested > 10000000) {
      this.loan_form
        .get('loanDetails')
        .get('amountRequested')
        .setValue({
          amountRequested: undefined
        });
    }
    if (this.loan.loanDetails.amountRequested < 0) {
      this.loan_form
        .get('loanDetails')
        .get('amountRequested')
        .setValue({
          amountRequested: undefined
        });
    }
  }

  calculatePmt(insurance: boolean) {
    let real_amount_requested: number;
    if (insurance) {
      const insurance_amount =
        (this.insurance_rate * this.loan.loanDetails.amountRequested * this.loan.loanDetails.repaymentsNumber) / 12;
      real_amount_requested = this.loan.loanDetails.amountRequested + insurance_amount;
    } else {
      real_amount_requested = this.loan.loanDetails.amountRequested;
    }
    this.expected_period_repayment = pmt(
      this.loan_rate / 12,
      this.loan.loanDetails.repaymentsNumber,
      -real_amount_requested
    );
    this.expected_total_repayment = this.expected_period_repayment * this.loan.loanDetails.repaymentsNumber;
  }
}
