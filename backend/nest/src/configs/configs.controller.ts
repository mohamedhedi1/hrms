import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { Config } from '@prisma/client';
import { ConfigsService } from './configs.service';
import { Public } from 'src/auth/common/decorators';

@Public()
@Controller('configs')
export class ConfigsController {
  constructor(private readonly configsService: ConfigsService) {}

  @Post()
  async createConfig(@Body() createConfigDto: Config): Promise<Config> {
    return this.configsService.createConfig(createConfigDto);
  }

  @Get()
  findAll() {
    return this.configsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.configsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateConfigDto: Config) {
    return this.configsService.update(id, updateConfigDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.configsService.remove(id);
  }
}
