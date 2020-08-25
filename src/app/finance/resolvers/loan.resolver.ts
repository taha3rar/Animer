import { GoodsReceivedNote } from '@avenews/agt-sdk/lib/types/goods-receive-note';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SdkService } from '@app/core/sdk.service';
import { from } from 'rxjs';
import { Loan } from '@avenews/agt-sdk';

@Injectable()
export class LoanResolver implements Resolve<Loan> {
  constructor(private sdkService: SdkService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Loan> {
    const id = route.params['id'];
    return from(this.sdkService.getLoanById(id)).pipe(
      catchError(() => {
        this.router.navigateByUrl('/not-found');
        return EMPTY.pipe();
      })
    );
  }
}