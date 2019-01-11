import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiService } from './api.service';
import { Observable, EMPTY } from 'rxjs';
import { Ecosystem } from '../models/ecosystem';
import { Client } from '../models/user/client';

@Injectable({
  providedIn: 'root'
})
export class EcosystemService extends BaseService {
  constructor(protected apiService: ApiService) {
    super(apiService, '/ecosystem');
  }

  deleteParticipant(ecosystemId: string, participantId: string): Observable<Ecosystem> {
    return this.apiService.delete(`/ecosystem/${ecosystemId}/participant/${participantId}`);
  }

  addParticipants(id: string, newParticipants: Client[]): Observable<any> {
    if (newParticipants.length > 0) {
      for (let i = 0; i < newParticipants.length - 1; i++) {
        const participant = newParticipants[i];
        this.apiService.put(`/ecosystem/${id}/participant`, participant).subscribe();
      }
      return this.apiService.put(`/ecosystem/${id}/participant`, newParticipants[newParticipants.length - 1]); // hack to return a promise
    } else {
      return EMPTY.pipe();
    }
  }
}
