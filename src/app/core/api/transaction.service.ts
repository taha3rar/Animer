import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BaseService } from './base.service';
import { Transaction } from '../models/transaction';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends BaseService {
  constructor(
    protected apiService: ApiService,
    protected userService: UserService) {
    super(apiService, '/transaction');
  }

  getByUserIdAndClientId(userId: string, clientId: string): Observable<Transaction[]> {
    return this.apiService.get(`/user/${userId}/client/${clientId}/transaction`).pipe(map(data => data));
  }
  
  getBuyer(transactionId: any) {
    let buyerId;
    this.apiService.get(`${this.path}/${transactionId}`).subscribe(data => {
      buyerId = data.buyer._id;
    });
    return this.userService.get(buyerId).pipe(map(data => data));
  }
}
