import { TestBed } from '@angular/core/testing';

import { ResumeAssistantService } from './resume-assistant.service';

describe('ResumeAssistantService', () => {
  let service: ResumeAssistantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResumeAssistantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
