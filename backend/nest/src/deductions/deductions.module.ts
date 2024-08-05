import { Module } from '@nestjs/common';
import { DeductionsService } from './deductions.service';
import { DeductionsController } from './deductions.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DeductionsController],
  providers: [DeductionsService, PrismaService],
})
export class DeductionsModule {}
