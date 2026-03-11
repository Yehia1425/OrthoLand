import { TestBed } from '@angular/core/testing';

import { OffersServices } from './offers-services';

describe('OffersServices', () => {
  let service: OffersServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffersServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
