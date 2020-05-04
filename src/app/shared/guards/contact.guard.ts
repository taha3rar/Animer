import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from '@app/core';
import { Contact } from '@app/core/models/user/contact';

@Injectable()
export class ContactGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService, private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | Observable<boolean> | boolean {
    const loggedUserId = this.authService.currentUserId;
    const contactId = route.params.id;

    return this.userService.getClientsByUser(loggedUserId).pipe(
      map((contact: Contact[]) => {
        // check if the logged user is a contact of the client's profile he's intending to see
        const isContact = contact.filter(u => u._id === contactId).length > 0 ? true : false;

        if (isContact) {
          return true;
        }

        this.router.navigate(['/unauthorized']);
        return false;
      }),
      catchError(err => {
        this.router.navigate(['/not-found']);
        return of(false);
      })
    );
  }
}
