import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends BaseService {
  constructor(protected apiService: ApiService) {
    super(apiService, '/invoice');
  }
}
