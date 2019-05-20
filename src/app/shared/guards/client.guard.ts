import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from '@app/core';
import { User } from '@app/core/models/user/user';

@Injectable()
export class ClientGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService, private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | Observable<boolean> | boolean {
    const loggedUserId = this.authService.currentUserId;

    return this.userService.get(route.params.id).pipe(
      map((client: User) => {
        // check if the logged user is a client of the client's profile he's intending to see
        const isClient = client.clients.filter(u => u._id === loggedUserId).length > 0 ? true : false;

        // check if the logged users referred the client's profile he's intending to see
        const isReferrer = client.referrer && client.referrer._id === loggedUserId;

        if (isReferrer || isClient) {
          return true;
        } else {
          this.router.navigate(['/unauthorized']);
          return false;
        }
      }),
      catchError(err => {
        this.router.navigate(['/not-found']);
        return of(false);
      })
    );
  }
}
