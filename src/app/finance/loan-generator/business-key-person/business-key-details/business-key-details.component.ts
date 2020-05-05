import { Component, OnInit } from '@angular/core';
import { LoanGeneratorDataService } from '../../loan-generator-data.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-business-key-details',
  templateUrl: './business-key-details.component.html',
  styleUrls: ['./business-key-details.component.scss']
})
export class BusinessKeyDetailsComponent implements OnInit {
  loan_form: FormGroup;
  constructor(private loanGeneratorDataService: LoanGeneratorDataService) {}

  ngOnInit() {
    this.loanGeneratorDataService.currentForm.subscribe(form => {
      this.loan_form = form;
    });
  }
}
