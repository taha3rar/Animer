import { PersonalInformation } from './personal-information';

export interface Credentials {
  user: {
    token: string;
    _id: string;
    personal_information: PersonalInformation;
    email: string;
    permissions: string[];
  };
}

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}
