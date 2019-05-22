import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiService } from './api.service';
import { QuoteRequest } from '../models/quote-request/quoteRequest';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService {
  constructor(protected apiService: ApiService) {
    super(apiService, '/quote-request');
  }

  getByUserIdAndClientId(userId: string, clientId: string): Observable<QuoteRequest[]> {
    return this.apiService.get(`/user/${userId}/client/${clientId}/quote-request`).pipe(map(data => data));
  }

  getByUserAsBuyer(userId: string): Observable<QuoteRequest[]> {
    return this.apiService.get(`${this.path}/user/${userId}/buyer`).pipe(map(data => data));
  }

  getByUserAsSeller(userId: string): Observable<QuoteRequest[]> {
    return this.apiService.get(`${this.path}/user/${userId}/seller`).pipe(map(data => data));
  }

  getPdf(orderId: string, version: string): Observable<Blob> {
    return this.apiService.getPdf(`${this.path}/${orderId}/pdf/${version}`).pipe(map(data => data));
  }

  draft(order: QuoteRequest) {
    return this.apiService.post(`/quote-request/draft`, order).pipe(map(data => data));
  }
}
