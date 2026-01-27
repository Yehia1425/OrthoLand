import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesDetails } from './categories-details';

describe('CategoriesDetails', () => {
  let component: CategoriesDetails;
  let fixture: ComponentFixture<CategoriesDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
