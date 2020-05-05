import { Component, OnInit } from '@angular/core';
import { LoanGeneratorDataService } from '../../loan-generator-data.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-applicant-personal-info',
  templateUrl: './applicant-personal-info.component.html',
  styleUrls: ['./applicant-personal-info.component.scss']
})
export class ApplicantPersonalInfoComponent implements OnInit {
  loan_form: FormGroup;

  constructor(private loanGeneratorDataService: LoanGeneratorDataService) {}

  ngOnInit() {
    this.loanGeneratorDataService.currentForm.subscribe(form => {
      this.loan_form = form;
    });
  }
}
