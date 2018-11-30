import { PersonalInformation } from './personal-information';
import { CompanyInformation } from './company-information';

export class User {
  email: string;
  password: string;
  token: string;
  personal_information: PersonalInformation;
  company_information: CompanyInformation;
  clients: [
    {
      _id: string;
      first_name: string;
      last_name: string;
      email: string;
      company_name: string;
      numericId: string;
    }
  ];
  referrer: {
    _id: string;
    first_name: String;
    last_name: String;
    email: String;
  };
  permissions: [string];
  roles: [string];
  _id: string;
  numericId: number;
  image: string;
  contact_by: string[];

  constructor() {
    this.personal_information = new PersonalInformation();
    this.company_information = new CompanyInformation();
  }
}
