import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-loan-generator-list',
  templateUrl: './loan-generator.component.html',
  styleUrls: ['./loan-generator.component.scss']
})
export class LoanGeneratorComponent implements OnInit {
  loanForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loanForm = this.formBuilder.group({
      loan_details: this.formBuilder.group({
        // STEP 1
        loan_amount: String,
        loan_purpose: String
      }),
      business_details: this.formBuilder.group({
        // STEP 2
        business_name: String,
        ownership_type: String,
        registration_nnumber: String,
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
        isBusinessInsured: Boolean,
        operation_time: Number
      }),
      applicant_details: [
        // STEP 3 can be up to 5 applicants
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
            Province: String,
            years_of_residency: Number
          }),
          postal_address: this.formBuilder.group({
            po_box: Number,
            postal_code: Number,
            city: String,
            Province: String
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
      referee_details: [
        // STEP 4 can be up to 2 referees
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
      business_banking_details: this.formBuilder.group({
        // STEP 5
        bank_details: [
          this.formBuilder.group({
            bank_name: String,
            bank_branch: String,
            account_number: Number,
            AnyLoanInBank: Boolean,
            loan_type: String,
            loan_currency: String,
            loan_amount: String,
            loan_date_taken: Date,
            outstanding_balance: Number, // WHATS IS IT ?
            monthly_repayment: Number, // WHAT IS IT ?
            term: String
          })
        ],
        applicant_card_details: [
          // Check the number of cards
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
  }
}
