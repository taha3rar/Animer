import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SdkService } from '@app/core/sdk.service';

@Injectable()
export class ContactGuard implements CanActivate {
  constructor(private router: Router, private sdkService: SdkService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | Observable<boolean> | boolean {
    const contactId = route.params.id;

    return from(this.sdkService.getContactById(contactId)).pipe(
      map(() => true), // guard is being done in the backend
      catchError(() => {
        this.router.navigate(['/not-authorized']);
        return of(false);
      })
    );
  }
}
