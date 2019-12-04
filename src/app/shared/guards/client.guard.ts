import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from '@app/core';
import { Client } from '@app/core/models/user/client';

@Injectable()
export class ClientGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService, private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | Observable<boolean> | boolean {
    const loggedUserId = this.authService.currentUserId;
    const clientId = route.params.id;

    return this.userService.getClientsByUser(loggedUserId).pipe(
      map((clients: Client[]) => {
        // check if the logged user is a client of the client's profile he's intending to see
        const isClient = clients.filter(u => u._id === clientId).length > 0 ? true : false;

        if (isClient) {
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
