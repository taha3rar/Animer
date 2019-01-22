import { ProformaInvoice } from '../models/transaction/proforma-invoice';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProformaInvoiceService extends BaseService {
  constructor(protected apiService: ApiService) {
    super(apiService, '/proforma-invoice');
  }

  getProformaInvoice(id: string): Observable<ProformaInvoice> {
    return this.getByTransaction(id).pipe(map(data => data));
  }
}
