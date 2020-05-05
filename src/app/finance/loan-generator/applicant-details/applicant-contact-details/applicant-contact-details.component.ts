import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoanGeneratorDataService } from '../../loan-generator-data.service';

@Component({
  selector: 'app-applicant-contact-details',
  templateUrl: './applicant-contact-details.component.html',
  styleUrls: ['./applicant-contact-details.component.scss']
})
export class ApplicantContactDetailsComponent implements OnInit {
  loan_form: FormGroup;
  constructor(private loanGeneratorDataService: LoanGeneratorDataService) {}

  ngOnInit() {
    this.loanGeneratorDataService.currentForm.subscribe(form => {
      this.loan_form = form;
    });
  }
}
