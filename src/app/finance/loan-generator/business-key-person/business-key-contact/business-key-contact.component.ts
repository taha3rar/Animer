import { Component, OnInit } from '@angular/core';
import { countries } from '@app/shared/helpers/countries';
import { LoanGeneratorDataService } from '../../loan-generator-data.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-business-key-contact',
  templateUrl: './business-key-contact.component.html',
  styleUrls: ['./business-key-contact.component.scss']
})
export class BusinessKeyContactComponent implements OnInit {
  loan_form: FormGroup;
  countries = countries;

  constructor(private loanGeneratorDataService: LoanGeneratorDataService) {}

  ngOnInit() {
    this.loanGeneratorDataService.currentForm.subscribe(form => {
      this.loan_form = form;
    });
  }
}
