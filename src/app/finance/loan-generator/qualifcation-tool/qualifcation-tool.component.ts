import { AuthenticationService } from '@app/core';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoanGeneratorDataService } from '../loan-generator-data.service';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { WBLoan } from '@app/core/models/finance/loans/wazesha-biashara/wazesha-biashara-loan';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qualifcation-tool',
  templateUrl: './qualifcation-tool.component.html',
  styleUrls: ['./qualifcation-tool.component.scss']
})
export class QualifcationToolComponent implements OnInit {
  loan_form: FormGroup;
  loan: WBLoan;
  first_name: string;
  last_name: string;
  currentIndex = 1;
  checkboxCounter = 0;
  otherOption = false;
  @Output() beginApplication: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private authenticationService: AuthenticationService,
    private loanGeneratorDataService: LoanGeneratorDataService,
    private router: Router
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
    this.loan_form
      .get('qualification')
      .get('otherAgribusinessType')
      .valueChanges.subscribe(type => {
        type
          ? this.loan_form
              .get('qualification')
              .get('agribusinessType')
              .setValidators([])
          : this.loan_form
              .get('qualification')
              .get('agribusinessType')
              .setValidators([Validators.required]);
        this.loan_form
          .get('qualification')
          .get('agribusinessType')
          .updateValueAndValidity();
      });
  }

  onNextQuestion() {
    if (this.currentIndex === 4 && !this.loan.qualification.businessType) {
      return;
    }
    this.currentIndex += 1;
  }

  onPrevQuestion() {
    this.currentIndex -= 1;
  }

  checkEligibility(loan: WBLoan) {
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
    const formArray: FormArray = this.loan_form.get('qualification').get('agribusinessType').value as FormArray;
    if (event.target.checked && this.checkboxCounter < 3) {
      formArray.push(new FormControl(event.target.value));
      this.checkboxCounter += 1;
    } else if (!event.target.checked) {
      let i = 0;
      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value === event.target.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
      this.checkboxCounter -= 1;
    } else {
      event.target.checked = false;
    }
    this.loan_form.get('qualification').patchValue({
      agribusinessType: formArray.value
    });
  }

  openTextField() {
    this.otherOption = true;
  }

  displayTab(index: number): boolean {
    return this.currentIndex === index;
  }
}
