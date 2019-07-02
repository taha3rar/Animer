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

  getPdf(qrId: string, version: string): Observable<Blob> {
    return this.apiService.getPdf(`${this.path}/${qrId}/pdf/${version}`).pipe(map(data => data));
  }
}
