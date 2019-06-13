import { TestBed } from '@angular/core/testing';

import { OrderAdminService } from './order-admin.service';

describe('OrderAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderAdminService = TestBed.get(OrderAdminService);
    expect(service).toBeTruthy();
  });
});
