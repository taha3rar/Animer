import { TestBed } from '@angular/core/testing';

import { QuotationService } from './quotation.service';

describe('InvoiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuotationService = TestBed.get(QuotationService);
    expect(service).toBeTruthy();
  });
});
