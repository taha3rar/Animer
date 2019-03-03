import { Observable, of } from 'rxjs';
import { Credentials, LoginContext } from '../models/user/login-models';

export class MockAuthenticationService {
  credentials: Credentials | null = {
    user: {
      email: 'test',
      token: '123',
      _id: '1234567',
      personal_information: {
        first_name: 'Diego',
        last_name: 'Milito',
        job_title: 'Captain',
        bio: 'Racing idol',
        profile_picture: 'an url',
        phone_number: '123456'
      },
      permissions: ['test'],
      roles: ['agribusiness']
    }
  };

  login(context: LoginContext): Observable<Credentials> {
    return of({
      user: {
        email: context.username,
        token: '123',
        _id: '1234567',
        personal_information: {
          first_name: 'Diego',
          last_name: 'Milito',
          job_title: 'Captain',
          bio: 'Racing idol',
          profile_picture: 'an url',
          phone_number: '123456'
        },
        permissions: ['test'],
        roles: ['agribusiness']
      }
    });
  }

  logout(): Observable<boolean> {
    this.credentials = null;
    return of(true);
  }

  isAuthenticated(): boolean {
    return !!this.credentials;
  }
}
