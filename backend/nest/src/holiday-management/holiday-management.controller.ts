import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { HolidayManagementService } from './holiday-management.service';
import { CreateHolidayManagementDto } from './dto/create-holiday-management.dto';
import { UpdateHolidayManagementDto } from './dto/update-holiday-management.dto';
import { Holiday } from '@prisma/client';

@Controller('holiday-management')
export class HolidayManagementController {
  constructor(
    private readonly holidayManagementService: HolidayManagementService,
  ) {}

  @Post()
  async createHoliday(
    @Body() createHolidayDto: CreateHolidayManagementDto,
  ): Promise<Holiday> {
    return this.holidayManagementService.createHoliday(createHolidayDto);
  }

  @Get()
  findAll() {
    return this.holidayManagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.holidayManagementService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateHolidayManagementDto: Holiday) {
    return this.holidayManagementService.update(id, updateHolidayManagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.holidayManagementService.remove(id);
  }
}
