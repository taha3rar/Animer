import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoanGeneratorDataService } from '../../loan-generator-data.service';

@Component({
  selector: 'app-applicant-bank-details',
  templateUrl: './applicant-bank-details.component.html',
  styleUrls: ['./applicant-bank-details.component.scss']
})
export class ApplicantBankDetailsComponent implements OnInit {
  loan_form: FormGroup;
  constructor(private loanGeneratorDataService: LoanGeneratorDataService) {}

  ngOnInit() {
    this.loanGeneratorDataService.currentForm.subscribe(form => {
      this.loan_form = form;
    });
  }
}
