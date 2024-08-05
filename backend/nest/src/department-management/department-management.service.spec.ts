import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentManagementService } from './department-management.service';

describe('DepartmentManagementService', () => {
  let service: DepartmentManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepartmentManagementService],
    }).compile();

    service = module.get<DepartmentManagementService>(DepartmentManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
