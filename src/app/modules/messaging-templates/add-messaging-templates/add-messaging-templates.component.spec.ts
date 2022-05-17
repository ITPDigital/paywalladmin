import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMessagingTemplatesComponent } from './add-messaging-templates.component';

describe('AddMessagingTemplatesComponent', () => {
  let component: AddMessagingTemplatesComponent;
  let fixture: ComponentFixture<AddMessagingTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMessagingTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMessagingTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
