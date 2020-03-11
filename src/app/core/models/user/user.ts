import { PersonalInformation } from './personal-information';
import { CompanyInformation } from './company-information';
import { DpoInformation } from './dpo-info';

export class User {
  email: string;
  password: string;
  token: string;
  personal_information: PersonalInformation;
  company_information: CompanyInformation;
  user_personal_id: string;
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
  permissions: string[];
  roles: string[];
  _id: string;
  numericId: number;
  image: string;
  contact_by: string[];
  notifications: string[];
  dpo_information: DpoInformation;

  constructor() {
    this.personal_information = new PersonalInformation();
    this.company_information = new CompanyInformation();
    this.dpo_information = new DpoInformation();
    this.permissions = [];
    this.contact_by = [];
    this.roles = [];
  }
}
