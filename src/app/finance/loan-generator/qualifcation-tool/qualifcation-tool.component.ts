import { AuthenticationService } from '@app/core';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoanGeneratorDataService } from '../loan-generator-data.service';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { CreateLoanDTO } from '@avenews/agt-sdk';

@Component({
  selector: 'app-qualifcation-tool',
  templateUrl: './qualifcation-tool.component.html',
  styleUrls: ['./qualifcation-tool.component.scss']
})
export class QualifcationToolComponent implements OnInit {
  loan_form: FormGroup;
  loan: CreateLoanDTO;
  first_name: string;
  last_name: string;
  currentIndex = 1;
  checkboxCounter = 0;
  otherOption = false;
  @Output() beginApplication: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private authenticationService: AuthenticationService,
    private loanGeneratorDataService: LoanGeneratorDataService
  ) {}

  ngOnInit() {
    this.first_name = this.authenticationService.credentials.user.personalInformation.firstName;
    this.last_name = this.authenticationService.credentials.user.personalInformation.lastName;
    this.loanGeneratorDataService.currentForm.subscribe(form => {
      if (form) {
        this.loan_form = form;
        this.loan = this.loan_form.value;
      }
    });
  }

  onNextQuestion(fastForward?: boolean) {
    if (fastForward) {
      this.currentIndex += 1;
    } else {
      switch (this.currentIndex) {
        case 1:
          if (this.loan_form.get('qualification').get('amountNeeded').valid) {
            this.currentIndex += 1;
          }
          break;
        case 2:
          if (this.loan_form.get('qualification').get('loanPurpose').valid) {
            this.currentIndex += 1;
          }
          break;
        case 3:
          if (
            this.loan_form.get('qualification').get('agribusinessType').valid === true ||
            this.loan_form.get('qualification').get('otherAgribusinessType').dirty
          ) {
            this.currentIndex += 1;
          }
          break;
        case 4:
          if (this.loan_form.get('qualification').get('businessType').valid) {
            this.currentIndex += 1;
          }
          break;
        case 5:
          if (this.loan_form.get('qualification').get('incorporationSeniority').valid) {
            this.currentIndex += 1;
          }
          break;
        case 6:
          if (this.loan_form.get('qualification').get('registrationCountry').valid) {
            this.currentIndex += 1;
          }
          break;
        case 7:
          if (this.loan_form.get('qualification').get('absaBankAccount').valid) {
            this.currentIndex += 1;
          }
          break;
      }
    }
    console.log(this.currentIndex);
  }

  onPrevQuestion() {
    this.currentIndex -= 1;
  }

  checkEligibility(loan: CreateLoanDTO) {
    return loan.qualification.absaBankAccount && this.loan.qualification.registrationCountry === 'kenya';
  }

  onFinishQualification() {
    this.loan = this.loan_form.value;
    // this.financeService.draft(this.loan).subscribe(loan => {
    //   // this.router.navigateByUrl('/finance');
    // });
    this.loan_form.get('qualification').patchValue({
      qualificationDone: true
    });
    this.beginApplication.emit(true);
  }

  onCheck(event: any) {
    // const types = this.loan.qualification.businessType;
    // console.log('value', event.target.value);
    // console.log('checked ?', event.target.checked);
    // console.log('counter', this.checkboxCounter);
    // console.log('formArray in', types);
    // if (event.target.checked && this.checkboxCounter < 3) {
    //   formArray.value.push(new FormControl(event.target.value));
    //   this.checkboxCounter += 1;
    // } else if (!event.target.checked) {
    //   let i = 0;
    //   formArray.controls.forEach((value: FormControl) => {
    //     if (value === event.target.value) {
    //       formArray.value.removeAt(i);
    //     }
    //     i++;
    //   });
    //   this.checkboxCounter -= 1;
    // }
    // else {
    //   event.target.checked = false;
    // }
    // console.log('formArray out', formArray.value);
    // this.loan_form.get('qualification').patchValue({
    //   agribusinessType: formArray.value
    // });
  }

  openTextField() {
    this.otherOption = true;
  }

  displayTab(index: number): boolean {
    return this.currentIndex === index;
  }
}
