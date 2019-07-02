import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { QuoteRequestService } from '@app/core/api/quote-request.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { QuoteRequest } from '@app/core/models/quote-request/quoteRequest';

@Injectable()
export class QuoteRequestGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private quoteRequestService: QuoteRequestService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | Observable<boolean> | boolean {
    const userId = this.authenticationService.currentUserId;

    return this.quoteRequestService.get(route.params.id).pipe(
      map((quoteRequest: QuoteRequest) => {
        if (userId === quoteRequest.buyer._id) {
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
