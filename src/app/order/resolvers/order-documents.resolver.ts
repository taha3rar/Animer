import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Document } from '@app/core/models/order/document';
import { DocumentService } from '@app/core/api/document.service';

@Injectable()
export class OrderDocumentsResolver implements Resolve<Document[]> {
  order_id: string;
  constructor(private documentService: DocumentService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Document[]> {
    this.order_id = route.params['id'];
    return this.documentService.getByTransaction(this.order_id).pipe(
      catchError(err => {
        return EMPTY.pipe();
      })
    );
  }
}
