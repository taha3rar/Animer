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

  getByQuoteRequestSeller(quoteRequestId: string, sellerId: string): Observable<Quotation> {
    return this.apiService
      .get(`${this.path}/quote-request/${quoteRequestId}/seller/${sellerId}`)
      .pipe(map(data => data));
  }

  acceptQuotation(quotationId: string): Observable<any> {
    return this.apiService.put(`${this.path}/${quotationId}/accept`).pipe(map(data => data));
  }

  getAccepted(quoteRequestId: string): Observable<Quotation[]> {
    return this.apiService.get(`${this.path}/quote-request/${quoteRequestId}/accepted`).pipe(map(data => data));
  }
}
