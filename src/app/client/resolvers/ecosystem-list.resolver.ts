import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AuthenticationService, EcosystemService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ecosystem } from '@app/core/models/ecosystem';

@Injectable()
export class EcosystemListResolver implements Resolve<Ecosystem[]> {
  constructor(private authService: AuthenticationService, private ecosystemService: EcosystemService) {}

  resolve(): Observable<Ecosystem[]> {
    const currentUserId = this.authService.currentUserId;

    return this.ecosystemService.getByUser(currentUserId).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
