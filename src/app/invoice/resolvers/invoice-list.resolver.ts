import { Injectable } from '@angular/core';
import { AuthenticationService, InvoiceService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '@app/core/models/user/user';
import { Resolve } from '@angular/router';

@Injectable()
export class InvoiceListResolver implements Resolve<User[]> {
  constructor(private authService: AuthenticationService, private invoiceService: InvoiceService) {}

  resolve(): Observable<User[]> {
    const currentUserId = this.authService.currentUserId;

    return this.invoiceService.getByUser(currentUserId).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
