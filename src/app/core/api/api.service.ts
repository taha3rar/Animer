import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getPdf(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpClient.request('GET', `${environment.api_url}${path}`, { responseType: 'arraybuffer' });
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpClient.get(`${environment.api_url}${path}`, { params: params });
  }

  getAll(path: string): Observable<any> {
    return this.httpClient.get(`${environment.api_url}${path}`);
  }

  put(path: string, body: Object = {}, params: HttpParams = new HttpParams()): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.put(`${environment.api_url}${path}`, JSON.stringify(body), {
      headers: headers,
      params: params
    });
  }

  post(path: string, body: Object = {}): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post(`${environment.api_url}${path}`, JSON.stringify(body), { headers: headers });
  }

  delete(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpClient.delete(`${environment.api_url}${path}`, {
      params: params
    });
  }
}
