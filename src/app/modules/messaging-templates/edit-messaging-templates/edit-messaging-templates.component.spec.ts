import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMessagingTemplatesComponent } from './edit-messaging-templates.component';

describe('EditMessagingTemplatesComponent', () => {
  let component: EditMessagingTemplatesComponent;
  let fixture: ComponentFixture<EditMessagingTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMessagingTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMessagingTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
