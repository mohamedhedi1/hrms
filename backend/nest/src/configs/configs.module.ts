import { Module } from '@nestjs/common';
import { ConfigsService } from './configs.service';
import { ConfigsController } from './configs.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ConfigsController],
  providers: [ConfigsService, PrismaService],
})
export class ConfigsModule {}
