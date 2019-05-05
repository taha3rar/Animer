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
    const userId = this.authService.currentUserId;

    return this.userService.get(route.params.id).pipe(
      map((client: User) => {
        if (this.authService.isAgribusiness) {
          if (client.referrer && client.referrer._id === userId) {
            return true;
          } else {
            this.router.navigate(['/unauthorized']);
            return false;
          }
        } else if (this.authService.isSeller || this.authService.isBuyer) {
          const isClient = client.clients.filter(user => user._id === userId).length > 0 ? true : false;
          if (isClient) {
            return true;
          } else {
            this.router.navigate(['/unauthorized']);
            return false;
          }
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
