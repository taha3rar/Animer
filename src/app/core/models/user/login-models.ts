import { User } from '@avenews/agt-sdk';

export interface Credentials {
  user: User;
  token: string;
}

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

export interface OAuthLoginContext {
  email: string;
  personal_network_id: string;
  access_token: string;
  remember?: boolean;
}
