import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { Invoice } from '@app/core/models/invoice/invoice';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { InvoiceService } from '@app/core';

@Injectable()
export class InvoiceGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private invoiceService: InvoiceService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | Observable<boolean> | boolean {
    const userId = this.authenticationService.currentUserId;

    return this.invoiceService.get(route.params.id).pipe(
      map((invoice: Invoice) => {
        if (invoice.draft) {
          if (this.authenticationService.isSeller) {
            if (userId === invoice.seller._id) {
              return true;
            } else {
              this.router.navigate(['/unauthorized']);
              return false;
            }
          } else if (this.authenticationService.isAgribusiness) {
            if (userId === invoice.seller._id) {
              return true;
            } else {
              this.router.navigate(['/unauthorized']);
              return false;
            }
          }
        } else {
          if (this.authenticationService.isSeller) {
            if (userId === invoice.seller._id) {
              return true;
            } else {
              this.router.navigate(['/unauthorized']);
              return false;
            }
          } else if (this.authenticationService.isBuyer) {
            if (userId === invoice.buyer._id) {
              return true;
            } else {
              this.router.navigate(['/unauthorized']);
              return false;
            }
          } else if (this.authenticationService.isAgribusiness) {
            if (userId === invoice.seller._id || userId === invoice.buyer._id) {
              return true;
            } else {
              this.router.navigate(['/unauthorized']);
              return false;
            }
          }
        }
      }),
      catchError(err => {
        this.router.navigate(['/not-found']);
        return of(false);
      })
    );
  }
}
