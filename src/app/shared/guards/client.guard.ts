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
        const isClient = client.clients.filter(user => user._id === userId).length > 0 ? true : false;
        if ((client.referrer && client.referrer._id === userId) || isClient) {
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
