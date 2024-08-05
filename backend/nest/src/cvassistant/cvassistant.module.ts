import { Module } from '@nestjs/common';
import { CvassistantController } from './cvassistant.controller';
import { CvassistantService } from './cvassistant.service';
import { ResumeService } from './resume/resume.service';


@Module({
  controllers: [CvassistantController],
  providers: [CvassistantService, ResumeService]
})
export class CvassistantModule {}
