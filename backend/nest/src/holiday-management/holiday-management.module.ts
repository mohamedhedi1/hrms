import { Module } from '@nestjs/common';
import { HolidayManagementService } from './holiday-management.service';
import { HolidayManagementController } from './holiday-management.controller';

@Module({
  controllers: [HolidayManagementController],
  providers: [HolidayManagementService],
})
export class HolidayManagementModule {}
