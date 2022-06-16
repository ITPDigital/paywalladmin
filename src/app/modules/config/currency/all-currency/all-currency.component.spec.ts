import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCurrencyComponent } from './all-currency.component';

describe('AllCurrencyComponent', () => {
  let component: AllCurrencyComponent;
  let fixture: ComponentFixture<AllCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCurrencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
