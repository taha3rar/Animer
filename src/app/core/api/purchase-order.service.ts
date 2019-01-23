import { PurchaseOrder } from './../models/transaction/purchase-order';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService extends BaseService {
  constructor(protected apiService: ApiService) {
    super(apiService, '/purchase-order');
  }

  getPurchaseOrder(id: string): Observable<PurchaseOrder> {
    return this.getByTransaction(id).pipe(map(data => data));
  }
}
