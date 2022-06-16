import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPaymentTypeComponent } from './all-payment-type.component';

describe('AllPaymentTypeComponent', () => {
  let component: AllPaymentTypeComponent;
  let fixture: ComponentFixture<AllPaymentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPaymentTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPaymentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
