import { User, LoginDTO, OAuthContext } from '@avenews/agt-sdk';

export interface Credentials {
  user: User;
  token: string;
}

export interface LoginContext extends LoginDTO {
  remember?: boolean;
}

export interface OAuthLoginContext extends OAuthContext {
  remember?: boolean;
}
