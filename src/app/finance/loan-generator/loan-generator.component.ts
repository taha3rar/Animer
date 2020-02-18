import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StepperNavigationService } from './stepper-navigation.service';

@Component({
  selector: 'app-loan-generator-list',
  templateUrl: './loan-generator.component.html',
  styleUrls: ['./loan-generator.component.scss']
})
export class LoanGeneratorComponent implements OnInit {
  loan_form: FormGroup;
  @ViewChild('generalSteps') generalSteps: ElementRef<HTMLElement>;

  constructor(private formBuilder: FormBuilder, private stepperNavigation: StepperNavigationService) {}

  ngOnInit() {
    this.loan_form = this.formBuilder.group({
      // STEP 1
      loan_details: this.formBuilder.group({
        loan_amount: Number,
        loan_purpose: String
      }),
      // STEP 2
      business_details: this.formBuilder.group({
        business_name: String,
        ownership_type: String,
        registration_number: String,
        incorporation_date: Date,
        vat_number: Number,
        employees_amount: Number,
        pin_number: Number,
        phone_number: Number,
        business_location: this.formBuilder.group({
          po_box: Number,
          postal_code: Number,
          city: String,
          street: String,
          building: String,
          plot_number: Number
        }),
        business_type: String, // Product or Service
        country_of_operation: String,
        business_premises: String,
        business_insurance: String,
        is_business_insured: Boolean,
        operation_time: Number
      }),
      // STEP 3 can be up to 5 applicants
      applicant_details: [
        this.formBuilder.group({
          first_name: String,
          middle_name: String,
          last_name: String,
          national_id_number: String,
          passport_number: String,
          pin_number: Number,
          nationality: String,
          kenyan_resident: Boolean,
          residence_country: String,
          birth_date: Date,
          birth_place: String,
          gender: String,
          marital_status: String,
          number_of_dependants: Number,
          ages_of_dependants: Number, // Array
          residential_address: this.formBuilder.group({
            physical_address: String,
            city: String,
            province: String,
            years_of_residency: Number
          }),
          postal_address: this.formBuilder.group({
            po_box: Number,
            postal_code: Number,
            city: String,
            province: String
          }),
          contact_details: this.formBuilder.group({
            mobile_phone_number: Number,
            home_phone_number: Number,
            other_phone_number: Number,
            email_address: Number
          }),
          five_years_same_address: Boolean,
          previous_physical_address: String,
          previous_city: String,
          previous_province: String,
          accomodation_type: String, // Specific conditions
          accomodation_owned_type: String,
          estimated_property_value: Number,
          signature: String,
          signature_date: Date
        })
      ],
      // STEP 4 can be up to 2 referees
      referee_details: [
        this.formBuilder.group({
          full_name: String,
          applicant_relationship: String,
          phone_number: String,
          po_box: Number,
          postal_code: Number,
          city: String,
          country: String
        })
      ],
      // STEP 5
      business_banking_details: this.formBuilder.group({
        bank_details: [
          this.formBuilder.group({
            bank_name: String,
            bank_branch: String,
            account_number: Number,
            any_loan_in_bank: Boolean,
            loan_type: String,
            loan_currency: String,
            loan_amount: String,
            loan_date_taken: Date,
            outstanding_balance: Number, // WHATS IS IT ?
            monthly_repayment: Number, // WHAT IS IT ?
            term: String
          })
        ],
        // Check the number of cards
        applicant_card_details: [
          this.formBuilder.group({
            applicant_name: String,
            card_issuer: String,
            credit_card_type: String,
            card_number: String, // Format separator
            card_expiry_date: Date,
            card_limit: Number
          })
        ]
      })
    });
    this.stepperNavigation.generalStepsList = this.generalSteps.nativeElement.children;
  }
}
