import { TestBed } from '@angular/core/testing';

import { EcosystemService } from './ecosystem.service';

describe('EcosystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EcosystemService = TestBed.get(EcosystemService);
    expect(service).toBeTruthy();
  });
});
