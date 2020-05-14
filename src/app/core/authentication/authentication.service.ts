import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { SocialNetworkName, SocialNetworkRegistrationDTO, LoginDTO, OAuthContext, Credentials } from '@avenews/agt-sdk';
import { map } from 'rxjs/operators';
import { SdkService } from '../sdk.service';

const credentialsKey = 'credentials';

@Injectable()
export class AuthenticationService {
  private _credentials: Credentials | null;

  constructor(private sdkService: SdkService) {
    const savedCredentials = localStorage.getItem(credentialsKey);

    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
      this.sdkService.setToken(this.credentials.token);
    }
  }

  async login(context: LoginDTO): Promise<Credentials> {
    const { username, password } = context;

    const creds = await this.sdkService.login(username, password);

    this.setCredentials(creds);

    return creds;
  }

  oAuthLogin(context: OAuthContext, network: SocialNetworkName): Observable<Credentials> {
    return from(this.sdkService.socialLogin(network, context)).pipe(
      map((user: Credentials) => {
        this.setCredentials(user);
        return user;
      })
    );
  }

  oAuthRegistration(socialUserInfo: SocialNetworkRegistrationDTO, network: SocialNetworkName): Observable<Credentials> {
    return from(this.sdkService.socialRegistration(socialUserInfo, network)).pipe(
      map((user: Credentials) => {
        this.setCredentials(user);
        return user;
      })
    );
  }

  forgotPassword(username: string): Observable<boolean> {
    const data = {
      email: username
    };

    return from(this.sdkService.resetPassword(data)).pipe(map(() => true));
  }

  logout(): Observable<boolean> {
    this.sdkService.setToken(this.credentials.token);
    return from(this.sdkService.logout()).pipe(
      map(() => {
        this.setCredentials();
        return true;
      })
    );
  }

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  get credentials(): Credentials | null {
    return this._credentials;
  }

  get currentUserId(): string | null {
    return this._credentials && this._credentials.user ? this._credentials.user._id : null;
  }

  get isAgribusiness(): boolean {
    return this.credentials.user.roles.includes('agribusiness');
  }

  setCredentials(credentials?: Credentials) {
    this._credentials = credentials || null;

    localStorage.clear(); // removes everything, it includes the currentPage in the different lists

    localStorage.setItem(credentialsKey, JSON.stringify(credentials));
  }
}
