import { countries } from '@app/shared/helpers/countries';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { LoanGeneratorDataService } from '../../loan-generator-data.service';

@Component({
  selector: 'app-business-location',
  templateUrl: './business-location.component.html',
  styleUrls: ['./business-location.component.scss', '../business-details.component.scss']
})
export class BusinessLocationComponent implements OnInit {
  countries = countries;
  loan_form: FormGroup;

  constructor(private loanGeneratorDataService: LoanGeneratorDataService) {}

  ngOnInit() {
    this.loanGeneratorDataService.currentForm.subscribe(form => {
      this.loan_form = form;
    });
  }
}
