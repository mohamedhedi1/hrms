import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceTrackingController } from './attendance-tracking.controller';
import { AttendanceTrackingService } from './attendance-tracking.service';

describe('AttendanceTrackingController', () => {
  let controller: AttendanceTrackingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttendanceTrackingController],
      providers: [AttendanceTrackingService],
    }).compile();

    controller = module.get<AttendanceTrackingController>(AttendanceTrackingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
