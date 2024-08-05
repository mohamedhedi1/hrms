import { Module } from '@nestjs/common';
import { DepartmentManagementService } from './department-management.service';
import { DepartmentManagementController } from './department-management.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DepartmentManagementController],
  providers: [DepartmentManagementService,PrismaService],
})
export class DepartmentManagementModule {}
