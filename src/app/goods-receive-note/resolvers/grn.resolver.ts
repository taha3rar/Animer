import { GoodsReceivedNote } from '@avenews/agt-sdk/lib/types/goods-receive-note';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SdkService } from '@app/core/sdk.service';
import { from } from 'rxjs';

@Injectable()
export class GrnResolver implements Resolve<GoodsReceivedNote> {
  constructor(private sdkService: SdkService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<GoodsReceivedNote> {
    const id = route.params['id'];
    return from(this.sdkService.getGoodsReceivedNoteById(id)).pipe(
      catchError(() => {
        this.router.navigateByUrl('/not-found');
        return EMPTY.pipe();
      })
    );
  }
}
