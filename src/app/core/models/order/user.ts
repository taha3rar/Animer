export class User {
  _id: string;
  numericId: number;
  first_name: string;
  last_name: string;
  email: string;
  company_name: string;
  company_number: string;
  address: string;
  city: string;
  country: string;
  zipcode: string;
  phone_number: string;
  contact_by: string[];

  constructor() {
    this.contact_by = [];
  }
}
