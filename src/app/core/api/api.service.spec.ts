import { TestBed, inject } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpCacheService, CoreModule } from '..';
import { HttpParams } from '@angular/common/http';

describe('ApiService', () => {
  let apiService: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [CoreModule, HttpClientTestingModule],
      providers: [HttpCacheService]
    }));

  beforeEach(inject(
    [HttpCacheService, ApiService, HttpTestingController],
    (htttpCacheService: HttpCacheService, _apiService: ApiService, _httpMock: HttpTestingController) => {
      apiService = _apiService;
      httpMock = _httpMock;

      htttpCacheService.cleanCache();
    }
  ));

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should return an array of objects', () => {
      // Arrange
      const mockArray = [{ a: 1 }, { b: 2 }];

      // Act
      const randomUserSubscription = apiService.getAll('/foobar');

      // Assert
      randomUserSubscription.subscribe((objects: any) => {
        expect(objects).toEqual(mockArray);
      });
      httpMock.expectOne({}).flush(mockArray);
    });

    it('should return a string in case of error', () => {
      // Act
      const randomObjectSubscription = apiService.getAll('/foobar');
      const mockError = {
        status: 500,
        statusText: 'error'
      };

      // Assert
      randomObjectSubscription.subscribe((err: any) => {
        expect(err.status).toBe(mockError.status);
        expect(err.statusText).toBe(mockError.statusText);
      });
      httpMock.expectOne({}).flush(null, mockError);
    });
  });

  describe('get', () => {
    it('should return a single object', () => {
      // Arrange
      const mockObject = { a: 1 };
      const params = new HttpParams();
      params.set('id', 'sarasa');

      // Act
      const randomUserSubscription = apiService.get('/foobar', params);

      // Assert
      randomUserSubscription.subscribe((objects: any) => {
        expect(objects).toEqual(mockObject);
      });
      httpMock.expectOne({}).flush(mockObject);
    });

    it('should return a string in case of error', () => {
      const params = new HttpParams();
      params.set('id', 'sarasa');

      // Act
      const randomObjectSubscription = apiService.get('/foobar', params);
      const mockError = {
        status: 500,
        statusText: 'error'
      };

      // Assert
      randomObjectSubscription.subscribe((err: any) => {
        expect(err.status).toBe(mockError.status);
        expect(err.statusText).toBe(mockError.statusText);
      });
      httpMock.expectOne({}).flush(null, mockError);
    });
  });
});
