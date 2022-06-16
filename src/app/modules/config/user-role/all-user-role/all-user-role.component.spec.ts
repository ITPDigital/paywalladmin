import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUserRoleComponent } from './all-user-role.component';

describe('AllUserRoleComponent', () => {
  let component: AllUserRoleComponent;
  let fixture: ComponentFixture<AllUserRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllUserRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllUserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
