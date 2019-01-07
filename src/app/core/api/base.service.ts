import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class BaseService {
  constructor(protected apiService: ApiService, protected path: string) {}

  get(id: string): Observable<any> {
    return this.apiService.get(`${this.path}/${id}`).pipe(map(data => data));
  }

  getByUser(userId: string): Observable<any> {
    return this.apiService.get(`${this.path}/user/${userId}`).pipe(map(data => data));
  }

  getAll(): Observable<any[]> {
    return this.apiService.get(this.path).pipe(map(data => data));
  }

  create(object: any): Observable<any> {
    return this.apiService.post(this.path, object).pipe(map(data => data));
  }

  update(id: string, object: any): Observable<any> {
    return this.apiService.put(`${this.path}/${id}`, object).pipe(map(data => data));
  }

  delete(id: string): Observable<any> {
    return this.apiService.delete(`${this.path}/${id}`).pipe(map(data => data));
  }

  getByTransaction(transactionId: string): Observable<any> {
    return this.apiService.get(`${this.path}/transaction/${transactionId}`).pipe(map(data => data));
  }
}
