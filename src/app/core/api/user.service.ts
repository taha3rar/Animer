import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { DpoInformation } from '../models/user/dpo-info';
import { DpoDocuments } from '../models/user/dpo-documents';
import { User } from '@avenews/agt-sdk';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  constructor(protected _apiService: ApiService) {
    super(_apiService, '/user');
  }

  updateNotifications(id: string, notifications: string[]): Observable<User> {
    return this.apiService.put(`/user/${id}`, { notifications: notifications }).pipe(map(data => data));
  }

  updateUserValidation(id: string): Observable<any> {
    return this.apiService.post(`/user/validate/${id}`).pipe(map(data => data));
  }

  saveUserDPOInformation(userDpoInfo: DpoInformation, id: string): Observable<any> {
    return this.apiService.post(`/user/${id}/dpo`, userDpoInfo).pipe(map(data => data));
  }

  saveDPODocuments(dpoDocs: DpoDocuments, id: string): Observable<any> {
    return this.apiService.post(`/user/${id}/dpo/document`, dpoDocs).pipe(map(data => data));
  }
}
