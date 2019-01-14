import { Injectable } from '@angular/core';
import { AuthenticationService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UserDocumentService } from '@app/core/api/user-document.service';
import { UserDocument } from '@app/core/models/user/document';

@Injectable()
export class UserDocumentListResolver implements Resolve<UserDocument[]> {
  constructor(private authService: AuthenticationService, private documentService: UserDocumentService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<UserDocument[]> {
    const currentUserId = this.authService.currentUserId;
    const clientId = route.params['id'];

    return this.documentService.getByUserIdAndClientId(currentUserId, clientId).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
