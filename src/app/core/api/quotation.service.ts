import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Quotation } from '../models/quotation/quotation';

@Injectable({
  providedIn: 'root'
})
export class QuotationService extends BaseService {
  constructor(protected apiService: ApiService) {
    super(apiService, '/quotation');
  }

  draft(quotation: Quotation) {
    return this.apiService.post(`/quotation/draft`, quotation).pipe(map(data => data));
  }
}
