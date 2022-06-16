import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StAddAdminComponent } from './st-add-admin.component';

describe('StAddAdminComponent', () => {
  let component: StAddAdminComponent;
  let fixture: ComponentFixture<StAddAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StAddAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StAddAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
