import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StepperNavigationService } from './stepper-navigation.service';
import { LoanGeneratorDataService } from './loan-generator-data.service';
import { WBLoan } from '@app/core/models/finance/loans/wazesha-biashara/wazesha-biashara-loan';

@Component({
  selector: 'app-loan-generator-list',
  templateUrl: './loan-generator.component.html',
  styleUrls: ['./loan-generator.component.scss']
})
export class LoanGeneratorComponent implements OnInit {
  loan_form: FormGroup;
  @ViewChild('generalSteps') generalSteps: ElementRef<HTMLElement>;
  @Input() beginApplication = false;
  currentGeneralActiveStep: number;
  loan: WBLoan;

  constructor(
    private formBuilder: FormBuilder,
    private stepperNavigation: StepperNavigationService,
    private loanGeneratorDataService: LoanGeneratorDataService
  ) {}

  ngOnInit() {
    this.loanGeneratorDataService.currentForm.subscribe(form => {
      if (form) {
        this.loan = form.value;
      }
    });
    // this.stepperNavigation.setGeneralStepsNumber(this.generalSteps.nativeElement.children.length);
    this.stepperNavigation.currentActiveGeneralStep.subscribe(stepNumber => {
      this.currentGeneralActiveStep = stepNumber;
    });
    this.loan_form = this.formBuilder.group({
      // Qualification
      qualification: this.formBuilder.group({
        amount_needed: [undefined, Validators.required],
        loan_purpose: [undefined, Validators.required],
        agribusiness_type: [this.formBuilder.array([], Validators.required)],
        business_type: [undefined],
        other_agribusiness_type: [undefined],
        incorporation_seniority: [undefined, Validators.required],
        registration_country: [undefined, Validators.required],
        absa_bank_account: [undefined, Validators.required],
        qualification_done: false
      }),
      // STEP 1
      // Loan Details
      loan_details: this.formBuilder.group({
        amount_requested: [undefined],
        repayments_number: [undefined],
        insure_with_absa: [undefined]
      }),
      // Loan Goals
      loan_goals: this.formBuilder.group({
        loan_for: [undefined],
        short_term: [undefined],
        long_term: [undefined]
      }),
      // STEP 2
      // Business Basic Details
      business_basic_details: this.formBuilder.group({
        business_name: undefined,
        business_nature: undefined,
        registration_date: undefined,
        registration_number: undefined,
        pin_number: undefined,
        vat_number: undefined,
        physical_address: undefined,
        street: undefined,
        phone_number: undefined,
        email_address: undefined,
        company_website: undefined
      }),
      // Business Location
      business_location: this.formBuilder.group({
        country: undefined,
        town: undefined,
        address: undefined,
        block_number: undefined,
        building_name: undefined,
        postal_code: undefined,
        po_box: undefined
      }),
      // Business Premises
      business_premises: this.formBuilder.group({
        premises: undefined
      }),
      // Business Other Details
      business_other_details: this.formBuilder.group({
        years_of_experience: 0,
        contact_person: undefined,
        number_of_people_working: 0
      }),
      // Business Financial Details
      business_financial_details: this.formBuilder.group({
        activity_from: undefined,
        activity_to: undefined,
        business_sales: undefined,
        stocks_held: undefined,
        cost_goods: undefined,
        trade_debtors_outstanding: undefined,
        operating_expenses: undefined,
        trade_creditors_oustanding: undefined,
        other_costs: undefined,
        other_debts: undefined,
        net_profit: undefined,
        paid_up_capital: undefined
      }),
      // Business Directors Details
      business_directors_details: this.formBuilder.group({
        full_name: undefined,
        id_number: undefined,
        role: [this.formBuilder.array([], Validators.required)],
        pin_number: undefined,
        shareholding: undefined,
        loan_guarantor: undefined,
        postal_address: undefined,
        postal_code: undefined
      }),
      // STEP 3
      applicant_details: this.formBuilder.group({
        full_name: undefined,
        other_names: undefined,
        gender: undefined,
        marital_status: undefined,
        kenyan_resident: undefined,
        birth_date: undefined,
        pin_number: undefined,
        residence_country: undefined,
        nationality: undefined,
        national_id_number: undefined,
        passport_number: undefined,
        postal_box: undefined,
        postal_code: undefined,
        telephone: undefined,
        mobile_phone: undefined,
        email: [undefined, Validators.email]
      }),
      // STEP 4
      business_key_person: this.formBuilder.group({
        full_name: undefined,
        other_names: undefined,
        gender: undefined,
        marital_status: undefined,
        kenyan_resident: undefined,
        birth_date: undefined,
        pin_number: undefined,
        residence_country: undefined,
        nationality: undefined,
        national_id_number: undefined,
        passport_number: undefined,
        postal_box: undefined,
        postal_code: undefined,
        country: undefined,
        telephone: undefined,
        mobile_phone: undefined,
        email: [undefined, Validators.email],
        designation: undefined,
        duration_in_business: undefined,
        qualification: undefined
      }),
      // biz key person location
      business_key_person_location: this.formBuilder.group({
        country: undefined,
        address: undefined,
        house_number: undefined,
        current_address_duration: undefined,
        postal_box: undefined
      }),
      // STEP 5
      absa_banking_details: this.formBuilder.group({
        bank_name: 'absa',
        bank_branch: undefined,
        account_number: undefined,
        account_opening_date: undefined,
        other_absa_facility: undefined,
        other_facility: this.formBuilder.group({
          bank_branch: undefined,
          nature_of_facility: undefined,
          limit_initial_granted: undefined,
          monthly_repayment: undefined,
          outstanding_balance: undefined
        })
      })
    });
    this.loanGeneratorDataService.setForm(this.loan_form);
    this.onChanges();
  }

  onChanges(): void {
    this.loan_form.valueChanges.subscribe(val => {
      console.log(this.loan_form.value);
      this.loanGeneratorDataService.setForm(this.loan_form);
    });
  }

  generateStepper() {
    this.stepperNavigation.setGeneralStepsNumber(this.generalSteps.nativeElement.children.length);
  }

  isQualificationDone() {
    return this.loan.qualification.qualification_done;
  }

  isSoleTrader() {
    return this.loan.qualification.business_type === 'sole trader';
  }

  displayStepTab(stepNumber: number): boolean {
    return this.currentGeneralActiveStep >= stepNumber;
  }

  displayStepContent(stepNumber: number): boolean {
    return this.currentGeneralActiveStep === stepNumber;
  }
}
