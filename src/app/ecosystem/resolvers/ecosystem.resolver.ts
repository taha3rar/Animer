import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { EcosystemService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ecosystem } from '@app/core/models/ecosystem';

@Injectable()
export class EcosystemResolver implements Resolve<Ecosystem> {
  constructor(private ecosystemService: EcosystemService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Ecosystem> {
    return this.ecosystemService.get(route.params['id']).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
