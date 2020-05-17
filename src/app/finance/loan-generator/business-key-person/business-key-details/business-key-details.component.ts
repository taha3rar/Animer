import { Component, OnInit } from '@angular/core';
import { LoanGeneratorDataService } from '../../loan-generator-data.service';
import { FormGroup } from '@angular/forms';
import { CreateLoanDTO } from '@avenews/agt-sdk';

@Component({
  selector: 'app-business-key-details',
  templateUrl: './business-key-details.component.html',
  styleUrls: ['./business-key-details.component.scss']
})
export class BusinessKeyDetailsComponent implements OnInit {
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
