import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { LoanGeneratorDataService } from '../../loan-generator-data.service';
import { CreateLoanDTO } from '@avenews/agt-sdk';

@Component({
  selector: 'app-business-directors-details',
  templateUrl: './business-directors-details.component.html',
  styleUrls: ['./business-directors-details.component.scss', '../business-details.component.scss']
})
export class BusinessDirectorsDetailsComponent implements OnInit {
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

  onCheck(event: any) {
    const formArray: FormArray = this.loan_form.get('businessDirectorsDetails').get('role').value as FormArray;
    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    } else if (!event.target.checked) {
      let i = 0;
      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value === event.target.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    } else {
      event.target.checked = false;
    }
    this.loan_form.get('qualification').patchValue({
      role: formArray.value
    });
  }
}
