import { Component, OnInit } from '@angular/core';
import { countries } from '@app/shared/helpers/countries';
import { LoanGeneratorDataService } from '../../loan-generator-data.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-business-key-location',
  templateUrl: './business-key-location.component.html',
  styleUrls: ['./business-key-location.component.scss']
})
export class BusinessKeyLocationComponent implements OnInit {
  loan_form: FormGroup;
  countries = countries;

  constructor(private loanGeneratorDataService: LoanGeneratorDataService) {}

  ngOnInit() {
    this.loanGeneratorDataService.currentForm.subscribe(form => {
      this.loan_form = form;
    });
  }
}
