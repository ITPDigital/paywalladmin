import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCancelReasonsComponent } from './all-cancel-reasons.component';

describe('AllCancelReasonsComponent', () => {
  let component: AllCancelReasonsComponent;
  let fixture: ComponentFixture<AllCancelReasonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCancelReasonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCancelReasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
