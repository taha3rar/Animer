import { TestBed } from '@angular/core/testing';

import { UserDocumentService } from './user-document.service';

describe('UserDocumentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserDocumentService = TestBed.get(UserDocumentService);
    expect(service).toBeTruthy();
  });
});
