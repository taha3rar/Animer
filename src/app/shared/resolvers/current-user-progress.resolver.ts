import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, EMPTY, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SdkService } from '@app/core/sdk.service';
import { UserProgress } from '@avenews/agt-sdk';

@Injectable()
export class CurrentUserProgressResolver implements Resolve<UserProgress> {
  constructor(private sdkService: SdkService) {}

  resolve(): Observable<UserProgress> {
    return from(this.sdkService.getCurrentUserProgress()).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
