import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StAllAdminsComponent } from './st-all-admins.component';

describe('StAllAdminsComponent', () => {
  let component: StAllAdminsComponent;
  let fixture: ComponentFixture<StAllAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StAllAdminsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StAllAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
