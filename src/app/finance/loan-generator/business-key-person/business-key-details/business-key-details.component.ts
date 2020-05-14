import { Component, OnInit } from '@angular/core';
import { LoanGeneratorDataService } from '../../loan-generator-data.service';
import { FormGroup } from '@angular/forms';
import { WBLoan } from '@app/core/models/finance/loans/wazesha-biashara/wazesha-biashara-loan';

@Component({
  selector: 'app-business-key-details',
  templateUrl: './business-key-details.component.html',
  styleUrls: ['./business-key-details.component.scss']
})
export class BusinessKeyDetailsComponent implements OnInit {
  loan_form: FormGroup;
  loan: WBLoan;
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
