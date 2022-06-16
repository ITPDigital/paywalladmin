import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllContTypeComponent } from './all-cont-type.component';

describe('AllContTypeComponent', () => {
  let component: AllContTypeComponent;
  let fixture: ComponentFixture<AllContTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllContTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllContTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
