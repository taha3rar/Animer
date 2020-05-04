import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserService, AuthenticationService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contact } from '@app/core/models/user/contact';

@Injectable()
export class CurrentUserContactsResolver implements Resolve<Contact[]> {
  constructor(private authService: AuthenticationService, private userService: UserService) {}

  resolve(): Observable<Contact[]> {
    const currentUserId = this.authService.currentUserId;

    return this.userService.getClientsByUser(currentUserId).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
