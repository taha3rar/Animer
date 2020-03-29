import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StepperNavigationService } from './stepper-navigation.service';
import { LoanGeneratorDataService } from './loan-generator-data.service';
import { LoanAboutComponent } from './loan-details/loan-about/loan-about.component';

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

  constructor(
    private formBuilder: FormBuilder,
    private stepperNavigation: StepperNavigationService,
    private loanGeneratorDataService: LoanGeneratorDataService
  ) {}

  ngOnInit() {
    this.stepperNavigation.setGeneralStepsNumber(this.generalSteps.nativeElement.children.length);
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
        absa_bank_account: [undefined, Validators.required]
      }),
      // STEP 1
      // Loan Details
      loan_details: this.formBuilder.group({
        loan_size: [undefined],
        repayments_num: [undefined],
        insure_absa: [undefined]
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
        brn: undefined,
        b_pin: undefined,
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
        premises_radio: undefined
      }),
      // Business Other Details
      business_other_details: this.formBuilder.group({
        experience: undefined,
        contact_person: undefined,
        people_working: undefined
      }),
      // Business Financial Details
      business_financial_details: this.formBuilder.group({
        business_from: undefined,
        business_to: undefined,
        business_sales: undefined,
        stocks_held: undefined,
        cost_goods: undefined,
        debtors_outstanding: undefined,
        operating_expenses: undefined,
        creditors_oustanding: undefined,
        other_costs: undefined,
        other_debts: undefined,
        net_profit: undefined,
        paid_capital: undefined
      }),
      // Business Directors Details
      business_directors_details: this.formBuilder.group({
        full_name: undefined,
        id: undefined,
        role_type: undefined,
        pin: undefined,
        shareholding: undefined,
        role_type: undefined,
        postal_address: undefined,
        pc: undefined
      }),
      // STEP 3 can be up to 5 applicants
      applicant_details: this.formBuilder.array([
        this.formBuilder.group({
          first_name: undefined,
          middle_name: undefined,
          last_name: undefined,
          national_id_number: undefined,
          passport_number: undefined,
          pin_number: undefined,
          nationality: undefined,
          kenyan_resident: undefined,
          residence_country: undefined,
          birth_date: undefined,
          birth_place: undefined,
          gender: undefined,
          marital_status: undefined,
          number_of_dependants: undefined,
          ages_of_dependants: undefined, // Array
          residential_address: this.formBuilder.group({
            physical_address: undefined,
            city: undefined,
            province: undefined,
            years_of_residency: undefined
          }),
          postal_address: this.formBuilder.group({
            po_box: undefined,
            postal_code: undefined,
            city: undefined,
            province: undefined
          }),
          contact_details: this.formBuilder.group({
            mobile_phone_number: undefined,
            home_phone_number: undefined,
            other_phone_number: undefined,
            email_address: undefined
          }),
          five_years_same_address: undefined,
          previous_physical_address: undefined,
          previous_city: undefined,
          previous_province: undefined,
          accomodation_type: undefined, // Specific conditions
          accomodation_owned_type: undefined,
          estimated_property_value: undefined,
          signature: undefined,
          signature_date: undefined
        })
      ]),
      // STEP 4 can be up to 2 referees
      referee_details: this.formBuilder.array([
        this.formBuilder.group({
          full_name: undefined,
          applicant_relationship: undefined,
          phone_number: undefined,
          po_box: undefined,
          postal_code: undefined,
          city: undefined,
          country: undefined
        })
      ]),
      // STEP 5
      business_banking_details: this.formBuilder.group({
        bank_details: this.formBuilder.array([
          this.formBuilder.group({
            bank_name: undefined,
            bank_branch: undefined,
            account_number: undefined,
            any_loan_in_bank: undefined,
            loan_type: undefined,
            loan_currency: undefined,
            loan_amount: undefined,
            loan_date_taken: undefined,
            outstanding_balance: undefined, // WHATS IS IT ?
            monthly_repayment: undefined, // WHAT IS IT ?
            term: undefined
          })
        ]),
        // Check the undefined of cards
        applicant_card_details: this.formBuilder.array([
          this.formBuilder.group({
            applicant_name: undefined,
            card_issuer: undefined,
            credit_card_type: undefined,
            card_number: undefined, // Format separator
            card_expiry_date: undefined,
            card_limit: undefined
          })
        ])
      })
    });
    this.loanGeneratorDataService.setForm(this.loan_form);
  }

  displayStepTab(stepNumber: number): boolean {
    return this.currentGeneralActiveStep >= stepNumber;
  }

  displayStepContent(stepNumber: number): boolean {
    return this.currentGeneralActiveStep === stepNumber;
  }
}
