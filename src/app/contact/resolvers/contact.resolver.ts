import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SdkService } from '@app/core/sdk.service';
import { from } from 'rxjs';
import { Contact } from '@avenews/agt-sdk';

@Injectable()
export class ContactResolver implements Resolve<Contact> {
  constructor(private sdkService: SdkService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Contact> {
    const id = route.params['id'];
    return from(this.sdkService.getContactById(id)).pipe(
      catchError(() => {
        this.router.navigateByUrl('/not-found');
        return EMPTY.pipe();
      })
    );
  }
}
