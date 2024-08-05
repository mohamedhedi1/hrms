import { Module } from '@nestjs/common';
import { ProjectManagementService } from './project-management.service';
import { ProjectManagementController } from './project-management.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ProjectManagementController],
  providers: [ProjectManagementService],
})
export class ProjectManagementModule {}
