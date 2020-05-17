import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoanGeneratorDataService } from '../../loan-generator-data.service';
import { CreateLoanDTO } from '@avenews/agt-sdk';

@Component({
  selector: 'app-business-basic-details',
  templateUrl: './business-basic-details.component.html',
  styleUrls: ['./business-basic-details.component.scss', '../business-details.component.scss']
})
export class BusinessBasicDetailsComponent implements OnInit {
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
