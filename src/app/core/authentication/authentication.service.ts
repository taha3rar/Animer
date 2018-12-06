import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../api/api.service';
import { map } from 'rxjs/operators';
import { Credentials, LoginContext } from '../models/user/login-models';
import { JwtService } from './jwt.service';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
  constructor(private apiService: ApiService, private jwtService: JwtService) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    const data = {
      email: context.username,
      password: context.password
    };

    return this.apiService.post('/user/login', data).pipe(
      map((user: Credentials) => {
        this.jwtService.setCredentials(user, context.remember);
        return user;
      })
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    const data = {
      _id: this.jwtService.currentUserId
    };

    return this.apiService.post('/user/logout', data).pipe(
      map(() => {
        this.jwtService.setCredentials();
        return true;
      })
    );
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.jwtService.credentials;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this.jwtService.credentials;
  }

  /**
   * Gets the user id.
   * @return The user id or null if the user is not authenticated.
   */
  get currentUserId(): string | null {
    return this.jwtService.currentUserId;
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
    this.jwtService.setCredentials(credentials, remember);
  }
}
