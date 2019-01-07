import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { QuoteRequest } from '../models/transaction/qr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QrService extends BaseService {
  constructor(protected apiService: ApiService) {
    super(apiService, '/quote-request');
  }

  getQuoteRequest(id: string): Observable<QuoteRequest> {
    return this.getByTransaction(id).pipe(map(data => data));
  }
}
