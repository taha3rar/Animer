import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiService } from '..';
import { UserDocument } from '../models/user/document';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDocumentService extends BaseService {
  constructor(protected apiService: ApiService) {
    super(apiService, '/contract');
  }

  getByUserIdAndClientId(userId: string, clientId: string): Observable<UserDocument[]> {
    return this.apiService.get(`/user/${userId}/client/${clientId}/contract`).pipe(map(data => data));
  }
}
