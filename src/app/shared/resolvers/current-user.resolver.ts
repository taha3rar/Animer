import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, EMPTY, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SdkService } from '@app/core/sdk.service';
import { User } from '@avenews/agt-sdk';

@Injectable()
export class CurrentUserResolver implements Resolve<User> {
  constructor(private sdkService: SdkService, private router: Router) {}

  resolve(): Observable<User> {
    return from(this.sdkService.getCurrentUser()).pipe(
      catchError(err => {
        console.error(err);
        this.router.navigate(['/login']);
        return EMPTY.pipe();
      })
    );
  }
}
