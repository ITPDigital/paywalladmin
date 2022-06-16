import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMetActionTypeComponent } from './all-met-action-type.component';

describe('AllMetActionTypeComponent', () => {
  let component: AllMetActionTypeComponent;
  let fixture: ComponentFixture<AllMetActionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMetActionTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMetActionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
