import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { AuthenticationService, EcosystemService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ecosystem } from '@app/core/models/ecosystem';

@Injectable()
export class EcosystemListResolver implements Resolve<Ecosystem[]> {
  constructor(
    private authService: AuthenticationService,
    private ecosystemService: EcosystemService,
    private router: Router
  ) {}

  resolve(): Observable<Ecosystem[]> {
    const currentUserId = this.authService.currentUserId;

    return this.ecosystemService.getByUser(currentUserId).pipe(
      catchError(err => {
        console.error(err);
        return this.router.navigateByUrl('/not-found');
        // return EMPTY.pipe();
      })
    );
  }
}
