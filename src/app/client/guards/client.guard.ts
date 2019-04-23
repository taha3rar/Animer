import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from '@app/core';
import { Client } from '@app/core/models/user/client';

@Injectable()
export class ClientGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | Observable<boolean> | boolean {
    const userId = this.authenticationService.currentUserId;

    return this.userService.getClientsByUser(userId).pipe(
      map((clients: Client[]) => {
        const clientIds = clients.map(client => client._id);
        const result = clientIds.includes(route.params.id);
        if (result) {
          return true;
        } else {
          this.router.navigate(['/not-found']);
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
