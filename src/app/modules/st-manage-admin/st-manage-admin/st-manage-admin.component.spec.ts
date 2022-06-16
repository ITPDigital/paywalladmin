import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StManageAdminComponent } from './st-manage-admin.component';

describe('StManageAdminComponent', () => {
  let component: StManageAdminComponent;
  let fixture: ComponentFixture<StManageAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StManageAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StManageAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
