/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProjectManagementService } from './projectManagement.service';

describe('Service: ProjectManagement', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectManagementService]
    });
  });

  it('should ...', inject([ProjectManagementService], (service: ProjectManagementService) => {
    expect(service).toBeTruthy();
  }));
});
