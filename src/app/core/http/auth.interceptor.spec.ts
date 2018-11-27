import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AuthenticationService } from '../authentication/authentication.service';

describe('AuthInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let authInterceptor: AuthInterceptor;
  let authService: AuthenticationService;

  function createInterceptor(_authService: AuthenticationService) {
    authInterceptor = new AuthInterceptor(_authService);
    return authInterceptor;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthenticationService,
        {
          provide: HTTP_INTERCEPTORS,
          useFactory: createInterceptor,
          deps: [AuthenticationService],
          multi: true
        }
      ]
    });
  });

  beforeEach(inject(
    [HttpClient, HttpTestingController, AuthenticationService],
    (_http: HttpClient, _httpMock: HttpTestingController, _authService: AuthenticationService) => {
      http = _http;
      httpMock = _httpMock;
      authService = _authService;
    }
  ));

  afterEach(() => {
    httpMock.verify();
  });

  it('should add token to the request headers', () => {
    // Arrange
    const credentials = { username: 'Toto', token: 'sarasa' };
    authService.setCredentials(credentials);

    // Act
    http.get('/toto').subscribe();

    // Assert
    httpMock.expectOne(
      r => r.headers.has('Authorization') && r.headers.get('Authorization') === `JWT ${credentials.token}`
    );
  });
});
