import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SdkService } from '@app/core/sdk.service';
import { from } from 'rxjs';
import { DPOWallet } from '@avenews/agt-sdk';

@Injectable()
export class DpoWalletResolver implements Resolve<DPOWallet> {
  constructor(private sdkService: SdkService, private router: Router) {}

  resolve(): Observable<DPOWallet> {
    return from(this.sdkService.getMyDPOWallet()).pipe(
      catchError(() => {
        this.router.navigateByUrl('/not-found');
        return EMPTY.pipe();
      })
    );
  }
}
