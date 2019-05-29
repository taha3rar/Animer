import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { QuoteRequest } from '../models/quote-request/quoteRequest';

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
}
