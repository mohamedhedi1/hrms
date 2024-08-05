/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RecruitementAssistantService } from './recruitementAssistant.service';

describe('Service: RecruitementAssistant', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecruitementAssistantService]
    });
  });

  it('should ...', inject([RecruitementAssistantService], (service: RecruitementAssistantService) => {
    expect(service).toBeTruthy();
  }));
});
