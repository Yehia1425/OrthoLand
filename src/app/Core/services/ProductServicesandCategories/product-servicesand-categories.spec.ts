import { TestBed } from '@angular/core/testing';

import { ProductServicesandCategories } from './product-servicesand-categories';

describe('ProductServicesandCategories', () => {
  let service: ProductServicesandCategories;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductServicesandCategories);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
