import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { LoanGeneratorDataService } from '../../loan-generator-data.service';

@Component({
  selector: 'app-business-directors-details',
  templateUrl: './business-directors-details.component.html',
  styleUrls: ['./business-directors-details.component.scss', '../business-details.component.scss']
})
export class BusinessDirectorsDetailsComponent implements OnInit {
  loan_form: FormGroup;

  constructor(private loanGeneratorDataService: LoanGeneratorDataService) {}

  ngOnInit() {
    this.loanGeneratorDataService.currentForm.subscribe(form => {
      this.loan_form = form;
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
