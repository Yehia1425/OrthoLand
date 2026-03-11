import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesOffers } from './categories-offers';

describe('CategoriesOffers', () => {
  let component: CategoriesOffers;
  let fixture: ComponentFixture<CategoriesOffers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesOffers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesOffers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
