export class WBLoan {
  qualification: {
    amount_needed: Number;
    loan_purpose: String;
    agribusiness_type: [String];
    business_type: String;
    other_agribusiness_type: String;
    incorporation_seniority: String;
    registration_country: String;
    absa_bank_account: Boolean;
    qualification_done: Boolean;
  };
  loan_details: {
    loan_amount: Number;
    loan_purpose: String;
  };
  business_details: {
    business_name: String;
    ownership_type: String;
    registration_number: String;
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
  absa_banking_details: {
    bank_name: String;
    bank_branch: String;
    account_number: String;
    account_opening_date: String;
    other_absa_facility: boolean;
    other_facility: {
      bank_branch: String;
      nature_of_facility: String;
      limit_initial_granted: String;
      monthly_repayment: number;
      outstanding_balance: number;
    };
  };
}
