import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Quotation } from '../models/quotation/quotation';

@Injectable({
  providedIn: 'root'
})
export class QuotationService extends BaseService {
  constructor(protected apiService: ApiService) {
    super(apiService, '/quotation');
  }

  getByQuoteRequest(quoteRequestId: string): Observable<Quotation[]> {
    return this.apiService.get(`${this.path}/quote-request/${quoteRequestId}`).pipe(map(data => data));
  }
}
