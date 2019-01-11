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

  addParticipant(ecosystemId: string, participant: Client) {
    return this.apiService.put(`/ecosystem/${ecosystemId}/participant`, participant);
  }

  addParticipants(id: string, newParticipants: Client[]): Observable<any> {
    if (newParticipants.length > 0) {
      for (let i = 0; i < newParticipants.length - 1; i++) {
        const participant = newParticipants[i];
        this.addParticipant(id, participant).subscribe();
      }
      return this.addParticipant(id, newParticipants[newParticipants.length - 1]); // hack to return a promise
    } else {
      return EMPTY.pipe();
    }
  }

  addParticipantToEcosystems(participant: Client, ecosystemsToBeAdded: Ecosystem[]): Observable<any> {
    if (ecosystemsToBeAdded.length > 0) {
      for (let i = 0; i < ecosystemsToBeAdded.length - 1; i++) {
        const ecosystem = ecosystemsToBeAdded[i];
        this.addParticipant(ecosystem._id, participant).subscribe();
      }
      const lastEcosystemId = ecosystemsToBeAdded[ecosystemsToBeAdded.length - 1]._id;
      return this.addParticipant(lastEcosystemId, participant); // hack to return a promise
    } else {
      return EMPTY.pipe();
    }
  }
}
