import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends BaseService {
  constructor(protected apiService: ApiService) {
    super(apiService, '/transaction');
  }
}
