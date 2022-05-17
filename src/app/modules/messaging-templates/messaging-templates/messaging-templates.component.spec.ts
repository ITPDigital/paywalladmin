import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagingTemplatesComponent } from './messaging-templates.component';

describe('MessagingTemplatesComponent', () => {
  let component: MessagingTemplatesComponent;
  let fixture: ComponentFixture<MessagingTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagingTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagingTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
