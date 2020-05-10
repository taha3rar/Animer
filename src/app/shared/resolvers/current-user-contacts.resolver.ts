import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, EMPTY, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SdkService } from '@app/core/sdk.service';
import { Contact } from '@avenews/agt-sdk';

@Injectable()
export class CurrentUserContactsResolver implements Resolve<Contact[]> {
  constructor(private sdkService: SdkService, private router: Router) {}

  resolve(): Observable<Contact[]> {
    return from(this.sdkService.getMyContacts()).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
