import { TestBed } from '@angular/core/testing';

import { MessagingTemplatesService } from './messaging-templates.service';

describe('MessagingTemplatesService', () => {
  let service: MessagingTemplatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagingTemplatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
