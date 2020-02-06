export class WBLoan {
  loan_details: {
    loan_amount: Number;
    loan_purpose: String;
  };
  business_details: {
    business_name: String;
    ownership_type: String;
    registration_nnumber: String;
    incorporation_date: Date;
    vat_number: Number;
    employees_amount: Number;
    pin_number: Number;
    phone_number: Number;
    business_location: {
      po_box: Number;
      postal_code: Number;
      city: String;
      street: String;
      building: String;
      plot_number: Number;
    };
    business_type: String;
    country_of_operation: String;
    business_premises: String;
    business_insurance: String;
    is_business_insured: Boolean;
    operation_time: Number;
  };
  applicant_details: [
    {
      first_name: String;
      middle_name: String;
      last_name: String;
      national_id_number: String;
      passport_number: String;
      pin_number: Number;
      nationality: String;
      kenyan_resident: Boolean;
      residence_country: String;
      birth_date: Date;
      birth_place: String;
      gender: String;
      marital_status: String;
      number_of_dependants: Number;
      ages_of_dependants: Number;
      residential_address: {
        physical_address: String;
        city: String;
        province: String;
        years_of_residency: Number;
      };
      postal_address: {
        po_box: Number;
        postal_code: Number;
        city: String;
        province: String;
      };
      contact_details: {
        mobile_phone_number: Number;
        home_phone_number: Number;
        other_phone_number: Number;
        email_address: Number;
      };
      five_years_same_address: Boolean;
      previous_physical_address: String;
      previous_city: String;
      previous_province: String;
      accomodation_type: String;
      accomodation_owned_type: String;
      estimated_property_value: Number;
      signature: String;
      signature_date: Date;
    }
  ];
  referee_details: [
    {
      full_name: String;
      applicant_relationship: String;
      phone_number: String;
      po_box: Number;
      postal_code: Number;
      city: String;
      country: String;
    }
  ];
  business_banking_details: {
    bank_details: [
      {
        bank_name: String;
        bank_branch: String;
        account_number: Number;
        any_loan_in_bank: Boolean;
        loan_type: String;
        loan_currency: String;
        loan_amount: String;
        loan_date_taken: Date;
        outstanding_balance: Number;
        monthly_repayment: Number;
        term: String;
      }
    ];
    applicant_card_details: [
      {
        applicant_name: String;
        card_issuer: String;
        credit_card_type: String;
        card_number: String;
        card_expiry_date: Date;
        card_limit: Number;
      }
    ];
  };
}
