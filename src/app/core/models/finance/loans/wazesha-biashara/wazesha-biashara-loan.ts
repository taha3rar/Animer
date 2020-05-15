export class WBLoan {
  qualification: {
    amountNeeded: Number;
    loanPurpose: String;
    agribusinessType: [String];
    businessType: String;
    otherAgribusinessType: String;
    incorporationSeniority: String;
    registrationCountry: String;
    absaBankAccount: Boolean;
    qualificationDone: Boolean;
  };
  loanDetails: {
    amountRequested: number;
    loanPurpose: String;
    insureWithAbsa: boolean;
    repaymentsNumber: number;
  };
  business_details: {
    businessName: String;
    ownership_type: String;
    registrationNumber: String;
    incorporation_date: Date;
    vatNumber: Number;
    employees_amount: Number;
    pinNumber: Number;
    phoneNumber: Number;
    businessLocation: {
      poBox: Number;
      postalCode: Number;
      city: String;
      street: String;
      building: String;
      plot_number: Number;
    };
    businessType: String;
    country_of_operation: String;
    businessPremises: String;
    business_insurance: String;
    is_business_insured: Boolean;
    operation_time: Number;
  };
  applicantDetails: [
    {
      first_name: String;
      middle_name: String;
      last_name: String;
      nationalIdNumber: String;
      passportNumber: String;
      pinNumber: Number;
      nationality: String;
      kenyanResident: Boolean;
      residenceCountry: String;
      birthDate: Date;
      birth_place: String;
      gender: String;
      maritalStatus: String;
      number_of_dependants: Number;
      ages_of_dependants: Number;
      residential_address: {
        physicalAddress: String;
        city: String;
        province: String;
        years_of_residency: Number;
      };
      postalAddress: {
        poBox: Number;
        postalCode: Number;
        city: String;
        province: String;
      };
      contact_details: {
        mobile_phone_number: Number;
        home_phone_number: Number;
        other_phone_number: Number;
        emailAddress: Number;
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
      fullName: String;
      applicant_relationship: String;
      phoneNumber: String;
      poBox: Number;
      postalCode: Number;
      city: String;
      country: String;
    }
  ];
  absaBankingDetails: {
    bankName: String;
    bankBranch: String;
    accountNumber: String;
    accountOpeningDate: String;
    otherAbsaFacility: boolean;
    otherFacility: {
      bankBranch: String;
      natureOfFacility: String;
      limitInitialGranted: String;
      monthlyRepayment: number;
      outstandingBalance: number;
    };
  };
}
