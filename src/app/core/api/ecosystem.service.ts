import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Ecosystem } from '../models/ecosystem';

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
}
