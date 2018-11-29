import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpClient
      .cache()
      .get(`${environment.api_url}${path}`, { params })
      .pipe(
        map((body: any) => body),
        catchError((err: any) => of(err))
      );
  }

  getAll(path: string): Observable<any> {
    return this.httpClient
      .cache()
      .get(`${environment.api_url}${path}`)
      .pipe(
        map((body: any) => body),
        catchError((err: any) => of(err))
      );
  }

  // put(path: string, body: Object = {}): Observable<any> {
  //   return this.http.put(
  //     `${environment.api_url}${path}`,
  //     JSON.stringify(body)
  //   ).pipe(catchError(this.formatErrors));
  // }

  post(path: string, body: Object = {}): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post(`${environment.api_url}${path}`, JSON.stringify(body), { headers: headers });
  }

  // delete(path): Observable<any> {
  //   return this.http.delete(
  //     `${environment.api_url}${path}`
  //   ).pipe(catchError(this.formatErrors));
  // }
}
