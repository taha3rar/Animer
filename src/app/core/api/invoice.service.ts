import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice/invoice';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends BaseService {
  constructor(protected apiService: ApiService) {
    super(apiService, '/invoice');
  }

  getByUserIdAndClientId(userId: string, clientId: string): Observable<Invoice[]> {
    return this.apiService.get(`/user/${userId}/client/${clientId}/invoice`).pipe(map(data => data));
  }

  getByUserAsBuyer(userId: string): Observable<Invoice[]> {
    return this.apiService.get(`${this.path}/user/${userId}/buyer`).pipe(map(data => data));
  }

  getByUserAsSeller(userId: string): Observable<Invoice[]> {
    return this.apiService.get(`${this.path}/user/${userId}/seller`).pipe(map(data => data));
  }

  draft(invoice: Invoice) {
    return this.apiService.post(`/invoice/draft`, invoice).pipe(map(data => data));
  }

  getPdf(invoiceId: string, version: string): Observable<Invoice> {
    return this.apiService.get(`${this.path}/${invoiceId}/pdf/${version}`).pipe(map(data => data));
  }

  getByOrder(orderId: String): Observable<Invoice> {
    return this.apiService.get(`/invoice/order/${orderId}`).pipe(
      map(data => {
        return data;
      })
    );
  }
}
