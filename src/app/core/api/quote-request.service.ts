import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { QuoteRequest } from '../models/quote-request/quoteRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteRequestService extends BaseService {
  constructor(protected apiService: ApiService) {
    super(apiService, '/quote-request');
  }

  draft(quoteRequest: QuoteRequest) {
    return this.apiService.post(`/quote-request/draft`, quoteRequest).pipe(map(data => data));
  }

  getPdf(qrId: string, version: string): Observable<QuoteRequest> {
    return this.apiService.get(`${this.path}/${qrId}/pdf/${version}`).pipe(map(data => data));
  }

  getByUserAsBuyer(userId: string): Observable<QuoteRequest[]> {
    return this.apiService.get(`${this.path}/user/${userId}/buyer`).pipe(map(data => data));
  }

  getByUserAsSeller(userId: string): Observable<QuoteRequest[]> {
    return this.apiService.get(`${this.path}/user/${userId}/seller`).pipe(map(data => data));
  }
}
