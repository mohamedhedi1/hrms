import { Module } from '@nestjs/common';
import { AttendanceTrackingService } from './attendance-tracking.service';
import { AttendanceTrackingController } from './attendance-tracking.controller';

@Module({
  controllers: [AttendanceTrackingController],
  providers: [AttendanceTrackingService],
})
export class AttendanceTrackingModule {}
