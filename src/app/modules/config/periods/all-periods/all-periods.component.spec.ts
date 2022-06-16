import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPeriodsComponent } from './all-periods.component';

describe('AllPeriodsComponent', () => {
  let component: AllPeriodsComponent;
  let fixture: ComponentFixture<AllPeriodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPeriodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPeriodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
