import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { WBLoan } from '../models/finance/loans/wazesha-biashara/wazesha-biashara-loan';

@Injectable({
  providedIn: 'root'
})
export class FinanceService extends BaseService {
  constructor(protected apiService: ApiService) {
    super(apiService, '/finance/loan');
  }

  draft(loan: WBLoan) {
    return this.apiService.post(`${this.path}/draft`, loan).pipe(map(data => data));
  }
}
