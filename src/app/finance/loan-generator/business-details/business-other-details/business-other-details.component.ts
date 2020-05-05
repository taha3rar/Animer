import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { LoanGeneratorDataService } from '../../loan-generator-data.service';

@Component({
  selector: 'app-business-other-details',
  templateUrl: './business-other-details.component.html',
  styleUrls: ['./business-other-details.component.scss', '../business-details.component.scss']
})
export class BusinessOtherDetailsComponent implements OnInit {
  loan_form: FormGroup;

  constructor(private loanGeneratorDataService: LoanGeneratorDataService) {}

  ngOnInit() {
    this.loanGeneratorDataService.currentForm.subscribe(form => {
      this.loan_form = form;
    });
  }

  addPeople() {
    const nb_of_people = this.loan_form.get('business_other_details').get('number_of_people_working').value;
    this.loan_form.get('business_other_details').patchValue({
      number_of_people_working: nb_of_people + 1
    });
  }

  removePeople() {
    const nb_of_people = this.loan_form.get('business_other_details').get('number_of_people_working').value;
    if (nb_of_people <= 0) {
      this.loan_form.get('business_other_details').patchValue({
        number_of_people_working: 0
      });
    } else {
      this.loan_form.get('business_other_details').patchValue({
        number_of_people_working: nb_of_people - 1
      });
    }
  }
}
