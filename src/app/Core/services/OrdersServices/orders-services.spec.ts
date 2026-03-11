import { TestBed } from '@angular/core/testing';

import { OrdersServices } from './orders-services';

describe('OrdersServices', () => {
  let service: OrdersServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
