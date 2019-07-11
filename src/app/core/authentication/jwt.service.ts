import { Injectable } from '@angular/core';
import { Credentials } from '../models/user/login-models';

const credentialsKey = 'credentials';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private _credentials: Credentials | null;

  constructor() {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
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

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.clear(); // removes everything, it includes the currentPage in the different lists
    }
  }
}
