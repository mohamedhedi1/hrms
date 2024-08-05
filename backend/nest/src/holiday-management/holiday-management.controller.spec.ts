import { Test, TestingModule } from '@nestjs/testing';
import { HolidayManagementController } from './holiday-management.controller';
import { HolidayManagementService } from './holiday-management.service';

describe('HolidayManagementController', () => {
  let controller: HolidayManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HolidayManagementController],
      providers: [HolidayManagementService],
    }).compile();

    controller = module.get<HolidayManagementController>(HolidayManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
