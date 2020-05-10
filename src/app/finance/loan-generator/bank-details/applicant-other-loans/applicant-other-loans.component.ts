import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoanGeneratorDataService } from '../../loan-generator-data.service';
import { WBLoan } from '@app/core/models/finance/loans/wazesha-biashara/wazesha-biashara-loan';

@Component({
  selector: 'app-applicant-other-loans',
  templateUrl: './applicant-other-loans.component.html',
  styleUrls: ['./applicant-other-loans.component.scss']
})
export class ApplicantOtherLoansComponent implements OnInit {
  loan_form: FormGroup;
  loan: WBLoan;
  constructor(private loanGeneratorDataService: LoanGeneratorDataService) {}

  ngOnInit() {
    this.loanGeneratorDataService.currentForm.subscribe(form => {
      this.loan_form = form;
      this.loan = this.loan_form.value;
    });
  }
}
