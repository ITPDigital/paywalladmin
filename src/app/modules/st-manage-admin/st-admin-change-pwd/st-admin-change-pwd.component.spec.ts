import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StAdminChangePwdComponent } from './st-admin-change-pwd.component';

describe('StAdminChangePwdComponent', () => {
  let component: StAdminChangePwdComponent;
  let fixture: ComponentFixture<StAdminChangePwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StAdminChangePwdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StAdminChangePwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
