import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SdkService } from '@app/core/sdk.service';
import { from } from 'rxjs';
import { DPOTransaction } from '@avenews/agt-sdk';

@Injectable()
export class TransactionViewResolver implements Resolve<DPOTransaction> {
  constructor(private sdkService: SdkService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<DPOTransaction> {
    const id = route.params['id'];
    return from(this.help(id)).pipe(
      catchError(() => {
        this.router.navigateByUrl('/not-found');
        return EMPTY.pipe();
      })
    );

    // uncomment this when its done
    // return from(this.sdkService.getDPOTransactionById(id)).pipe(
    //   catchError(() => {
    //     this.router.navigateByUrl('/not-found');
    //     return EMPTY.pipe();
    //   })
    // );
  }
  help(id: string): Promise<DPOTransaction> {
    return new Promise(res => {
      this.sdkService.getMyDPOTransactions().then(data => {
        const index = data.findIndex(check => {
          return check._id === id;
        });
        res(data[index]);
      });
    });
  }
}
