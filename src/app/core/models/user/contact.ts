import { User } from './user';

export class Contact {
  company_name: string;
  email: string;
  first_name: string;
  last_name: string;
  numericId: number;
  phone_number: string;
  role: string;
  _id: string;
  profile_picture: string;
  country: string;

  constructor(private user: User = new User()) {
    this._id = user._id;
    this.company_name = user.company_information.company_name;
    this.email = user.email;
    this.first_name = user.personal_information.first_name;
    this.last_name = user.personal_information.last_name;
    this.numericId = user.numericId;
    this.phone_number = user.personal_information.phone_number;
    this.profile_picture = user.personal_information.profile_picture;
    this.role = user.roles[0];
    this.country = user.company_information.country;
  }
}
