import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiService } from '..';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Document } from '../models/order/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService extends BaseService {
  constructor(protected apiService: ApiService) {
    super(apiService, '/document');
  }

  getByTransaction(id: any): Observable<Document[]> {
    return this.apiService.get(`/document/transaction/${id}`).pipe(map(data => data));
  }
}
