import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoanNavigationComponent } from '../loan-navigation.component';
import { StepperNavigationService } from '../stepper-navigation.service';
import { countries } from '@app/shared/helpers/countries';
import { LoanGeneratorDataService } from '../loan-generator-data.service';
import { FormGroup } from '@angular/forms';
import { WBLoan } from '@app/core/models/finance/loans/wazesha-biashara/wazesha-biashara-loan';

@Component({
  selector: 'app-business-key-person',
  templateUrl: './business-key-person.component.html',
  styleUrls: ['./business-key-person.component.scss']
})
export class BusinessKeyPersonComponent extends LoanNavigationComponent implements OnInit, AfterViewInit {
  countries = countries;
  loan_form: FormGroup;
  loan: WBLoan;
  isLimitedCompany: boolean;

  constructor(
    stepperNavigationService: StepperNavigationService,
    private loanGeneratorDataService: LoanGeneratorDataService
  ) {
    super(3, stepperNavigationService);
  }

  ngOnInit() {
    this.loanGeneratorDataService.currentForm.subscribe(form => {
      this.loan_form = form;
      this.loan = this.loan_form.value;
      this.isLimitedCompany = this.loan.qualification.business_type === 'limited company';
    });
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }
}
