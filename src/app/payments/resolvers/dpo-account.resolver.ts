import { GoodsReceivedNote } from '@avenews/agt-sdk/lib/types/goods-receive-note';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SdkService } from '@app/core/sdk.service';
import { from } from 'rxjs';
import { DPOAccount } from '@avenews/agt-sdk';

@Injectable()
export class DpoAccountResolver implements Resolve<DPOAccount> {
  constructor(private sdkService: SdkService, private router: Router) {}

  resolve(): Observable<DPOAccount> {
    return from(this.sdkService.getMyDPOAccount()).pipe(
      catchError(() => {
        this.router.navigateByUrl('/not-found');
        return EMPTY.pipe();
      })
    );
  }
}
