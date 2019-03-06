import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getPdf(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpClient.cache().request('GET', `${environment.api_url}${path}`, { responseType: 'arraybuffer' });
    // .pipe(catchError((err: any) => of(err)));
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpClient.cache().get(`${environment.api_url}${path}`, { params: params });
    // .pipe(catchError((err: any) => of(err)));
  }

  getAll(path: string): Observable<any> {
    return this.httpClient.cache().get(`${environment.api_url}${path}`);
    // .pipe(catchError((err: any) => of(err)));
  }

  put(path: string, body: Object = {}, params: HttpParams = new HttpParams()): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.put(`${environment.api_url}${path}`, JSON.stringify(body), {
      headers: headers,
      params: params
    });
    // .pipe(catchError((err: any) => of(err)));
  }

  post(path: string, body: Object = {}): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post(`${environment.api_url}${path}`, JSON.stringify(body), { headers: headers });
    // .pipe(catchError((err: any) => of(err)));
  }

  delete(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpClient.delete(`${environment.api_url}${path}`, {
      params: params
    });
    // .pipe(catchError(catchError((err: any) => of(err))));
  }
}
