import { Module } from '@nestjs/common';
import { AllowancesService } from './allowances.service';
import { AllowancesController } from './allowances.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AllowancesController],
  providers: [AllowancesService, PrismaService],
})
export class AllowancesModule {}
