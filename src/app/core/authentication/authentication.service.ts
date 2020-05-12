import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { ApiService as SdkService } from '@avenews/agt-sdk';
import { map } from 'rxjs/operators';
import { Credentials, LoginContext, OAuthLoginContext } from '../models/user/login-models';
import { environment } from '@env/environment';
import { ApiService } from '../api/api.service';

const credentialsKey = 'credentials';

@Injectable()
export class AuthenticationService {
  private _credentials: Credentials | null;
  private sdkService: SdkService;

  constructor(private apiService: ApiService) {
    this.sdkService = new SdkService(environment.new_api_url);

    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  async login(context: LoginContext): Promise<Credentials> {
    const { username, password, remember } = context;

    const creds = await this.sdkService.login(username, password);

    this.setCredentials(creds, remember);

    return creds;
  }

  oAuthLogin(context: OAuthLoginContext, network: string): Observable<Credentials> {
    // async oAuthLogin(context: OAuthLoginContext, network: string): Promise<Credentials> {
    // const creds = await this.sdkService.socialLogin(network, context); // TODO

    // this.setCredentials(creds, context.remember);

    // return creds;

    return this.apiService.post(`/user/login/${network}`, context).pipe(
      map((user: Credentials) => {
        this.setCredentials(user, context.remember);
        return user;
      })
    );
  }

  forgotPassword(username: string): Observable<boolean> {
    // TODO
    const data = {
      email: username
    };

    return from(this.sdkService.resetPassword(data)).pipe(map(() => true));
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    this.sdkService.setToken(this.credentials.token);
    return from(this.sdkService.logout()).pipe(
      map(() => {
        this.setCredentials();
        return true;
      })
    );
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Gets the user id.
   * @return The user id or null if the user is not authenticated.
   */
  get currentUserId(): string | null {
    return this._credentials && this._credentials.user ? this._credentials.user._id : null;
  }

  get isAgribusiness(): boolean {
    return this.credentials.user.roles.includes('agribusiness');
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  // private //make it public for testing purposes
  setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    // flush existing credentials in case exists
    sessionStorage.removeItem(credentialsKey);
    localStorage.clear(); // removes everything, it includes the currentPage in the different lists

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    }
  }
}
