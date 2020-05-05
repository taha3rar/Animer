import { AuthenticationService } from '@app/core';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoanGeneratorDataService } from '../loan-generator-data.service';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { WBLoan } from '@app/core/models/finance/loans/wazesha-biashara/wazesha-biashara-loan';
import { FinanceService } from '@app/core/api/finance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qualifcation-tool',
  templateUrl: './qualifcation-tool.component.html',
  styleUrls: ['./qualifcation-tool.component.scss']
})
export class QualifcationToolComponent implements OnInit {
  loan_form: FormGroup;
  loan: WBLoan;
  userFirstName: string;
  currentIndex = 1;
  checkboxCounter = 0;
  otherOption = false;
  @Output() beginApplication: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private authenticationService: AuthenticationService,
    private loanGeneratorDataService: LoanGeneratorDataService,
    private financeService: FinanceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userFirstName = this.authenticationService.credentials.user.personalInformation.firstName;
    this.loanGeneratorDataService.currentForm.subscribe(form => {
      this.loan_form = form;
    });
    this.loan_form
      .get('qualification')
      .get('other_agribusiness_type')
      .valueChanges.subscribe(type => {
        type
          ? this.loan_form
              .get('qualification')
              .get('agribusiness_type')
              .setValidators([])
          : this.loan_form
              .get('qualification')
              .get('agribusiness_type')
              .setValidators([Validators.required]);
        this.loan_form
          .get('qualification')
          .get('agribusiness_type')
          .updateValueAndValidity();
      });
  }

  onNextQuestion() {
    this.currentIndex += 1;
  }

  onPrevQuestion() {
    this.currentIndex -= 1;
  }

  onFinishQualification() {
    this.beginApplication.emit(true);
    this.loan = this.loan_form.value;
    console.log('form', this.loan_form);
    console.log('loan', this.loan);
    this.financeService.draft(this.loan).subscribe(loan => {
      console.log(loan);
      // this.router.navigateByUrl('/finance');
    });
  }

  onCheck(event: any) {
    const formArray: FormArray = this.loan_form.get('qualification').get('agribusiness_type').value as FormArray;
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
      agribusiness_type: formArray.value
    });
  }

  openTextField() {
    this.otherOption = true;
  }

  displayTab(index: number): boolean {
    return this.currentIndex === index;
  }
}
