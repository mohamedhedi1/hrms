import { Test, TestingModule } from '@nestjs/testing';
import { HolidayManagementService } from './holiday-management.service';

describe('HolidayManagementService', () => {
  let service: HolidayManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HolidayManagementService],
    }).compile();

    service = module.get<HolidayManagementService>(HolidayManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
