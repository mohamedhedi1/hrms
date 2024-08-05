import { Module } from '@nestjs/common';

import { MissionsController } from './missions.controller';
import { MissionService } from './missions.service';

@Module({
  controllers: [MissionsController],
  providers: [MissionService],
})
export class MissionsModule {}
