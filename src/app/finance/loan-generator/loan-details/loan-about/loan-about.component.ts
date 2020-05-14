import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoanGeneratorDataService } from '../../loan-generator-data.service';
import { WBLoan } from '@app/core/models/finance/loans/wazesha-biashara/wazesha-biashara-loan';
const pmt = require('formula-pmt');

@Component({
  selector: 'app-loan-about',
  templateUrl: './loan-about.component.html',
  styleUrls: ['./loan-about.component.scss']
})
export class LoanAboutComponent implements OnInit {
  loan_form: FormGroup;
  loan: WBLoan;
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
        this.calculatePmt(this.loan.loan_details.insure_with_absa);
      }
    });
  }

  calculatePmt(insurance: boolean) {
    let real_amount_requested: number;
    if (insurance) {
      const insurance_amount =
        (this.insurance_rate * this.loan.loan_details.amount_requested * this.loan.loan_details.repayments_number) / 12;
      real_amount_requested = this.loan.loan_details.amount_requested + insurance_amount;
    } else {
      real_amount_requested = this.loan.loan_details.amount_requested;
    }
    this.expected_period_repayment = pmt(
      this.loan_rate / 12,
      this.loan.loan_details.repayments_number,
      -real_amount_requested
    );
    this.expected_total_repayment = this.expected_period_repayment * this.loan.loan_details.repayments_number;
  }
}
