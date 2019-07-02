import { TestBed } from '@angular/core/testing';

import { QuoteRequestService } from './quote-request.service';

describe('InvoiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuoteRequestService = TestBed.get(QuoteRequestService);
    expect(service).toBeTruthy();
  });
});
