import { PersonalInformation } from './personal-information';

export interface Credentials {
  user: {
    token: string;
    _id: string;
    personal_information: PersonalInformation;
    email: string;
    permissions: string[];
    roles: string[];
  };
}

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

export interface FacebookLoginContext {
  email: string;
  facebook_id: string;
  access_token: string;
  remember?: boolean;
}
