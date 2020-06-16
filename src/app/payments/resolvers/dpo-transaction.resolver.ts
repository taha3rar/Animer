import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SdkService } from '@app/core/sdk.service';
import { from } from 'rxjs';
import { DPOTransaction } from '@avenews/agt-sdk';

@Injectable()
export class DpoTransactionResolver implements Resolve<DPOTransaction[]> {
  constructor(private sdkService: SdkService, private router: Router) {}

  resolve(): Observable<DPOTransaction[]> {
    return from(this.sdkService.getMyDPOTransactions()).pipe(
      catchError(() => {
        this.router.navigateByUrl('/not-found');
        return EMPTY.pipe();
      })
    );
  }
}
