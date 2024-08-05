import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { Deduction } from '@prisma/client';
import { DeductionsService } from './deductions.service';
import { Public } from 'src/auth/common/decorators';

@Public()
@Controller('deductions')
export class DeductionsController {
  constructor(private readonly deductionsService: DeductionsService) {}

  @Post()
  async createDeduction(
    @Body() createDeductionDto: Deduction,
  ): Promise<Deduction> {
    return this.deductionsService.createDeduction(createDeductionDto);
  }

  @Get()
  findAll() {
    return this.deductionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deductionsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDeductionDto: Deduction) {
    return this.deductionsService.update(id, updateDeductionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deductionsService.remove(id);
  }
}
