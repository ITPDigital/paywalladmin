import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StEditAdminComponent } from './st-edit-admin.component';

describe('StEditAdminComponent', () => {
  let component: StEditAdminComponent;
  let fixture: ComponentFixture<StEditAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StEditAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StEditAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
