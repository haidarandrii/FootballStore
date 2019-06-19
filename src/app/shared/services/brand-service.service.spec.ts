import { TestBed } from '@angular/core/testing';

import { BrandServiceService } from './brand-service.service';

describe('BrandServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BrandServiceService = TestBed.get(BrandServiceService);
    expect(service).toBeTruthy();
  });
});
