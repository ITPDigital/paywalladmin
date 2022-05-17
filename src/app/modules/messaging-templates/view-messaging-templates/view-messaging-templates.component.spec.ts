import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMessagingTemplatesComponent } from './view-messaging-templates.component';

describe('ViewMessagingTemplatesComponent', () => {
  let component: ViewMessagingTemplatesComponent;
  let fixture: ComponentFixture<ViewMessagingTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMessagingTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMessagingTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
