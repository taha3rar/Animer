import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoanGeneratorDataService } from '../../loan-generator-data.service';
import { CreateLoanDTO } from '@avenews/agt-sdk';

@Component({
  selector: 'app-applicant-other-loans',
  templateUrl: './applicant-other-loans.component.html',
  styleUrls: ['./applicant-other-loans.component.scss']
})
export class ApplicantOtherLoansComponent implements OnInit {
  loan_form: FormGroup;
  loan: CreateLoanDTO;
  constructor(private loanGeneratorDataService: LoanGeneratorDataService) {}

  ngOnInit() {
    this.loanGeneratorDataService.currentForm.subscribe(form => {
      if (form) {
        this.loan_form = form;
        this.loan = this.loan_form.value;
      }
    });
  }
}
