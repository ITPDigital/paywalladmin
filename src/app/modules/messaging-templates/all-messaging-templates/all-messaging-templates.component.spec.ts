import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMessagingTemplatesComponent } from './all-messaging-templates.component';

describe('AllMessagingTemplatesComponent', () => {
  let component: AllMessagingTemplatesComponent;
  let fixture: ComponentFixture<AllMessagingTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMessagingTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMessagingTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
