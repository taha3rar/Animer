import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const credentials = this.jwtService.credentials;

    if (credentials && credentials.user) {
      request = request.clone({
        headers: request.headers.append('Authorization', `JWT ${credentials.user.token}`)
      });
    }

    return next.handle(request);
  }
}
