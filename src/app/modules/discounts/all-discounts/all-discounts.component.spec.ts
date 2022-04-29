import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDiscountsComponent } from './all-discounts.component';

describe('AllDiscountsComponent', () => {
  let component: AllDiscountsComponent;
  let fixture: ComponentFixture<AllDiscountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllDiscountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
