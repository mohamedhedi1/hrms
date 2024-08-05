/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChatserviceService } from './chatservice.service';

describe('Service: Chatservice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatserviceService]
    });
  });

  it('should ...', inject([ChatserviceService], (service: ChatserviceService) => {
    expect(service).toBeTruthy();
  }));
});
