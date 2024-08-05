import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentManagementController } from './department-management.controller';
import { DepartmentManagementService } from './department-management.service';

describe('DepartmentManagementController', () => {
  let controller: DepartmentManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentManagementController],
      providers: [DepartmentManagementService],
    }).compile();

    controller = module.get<DepartmentManagementController>(DepartmentManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
