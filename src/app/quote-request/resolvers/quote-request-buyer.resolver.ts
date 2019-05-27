import { Injectable } from '@angular/core';
import { AuthenticationService, UserService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Resolve, Router } from '@angular/router';
import { Client } from '@app/core/models/user/client';

@Injectable()
export class QuoteRequestBuyerResolver implements Resolve<Client[]> {
  constructor(private authService: AuthenticationService, private userService: UserService, private router: Router) {}

  resolve(): Observable<Client[]> {
    const currentUserId = this.authService.currentUserId;

    return this.userService.get(currentUserId).pipe(
      catchError(err => {
        console.error(err);
        return this.router.navigateByUrl('/not-found');
      })
    );
  }
}
