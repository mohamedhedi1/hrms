import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { Allowance, User } from '@prisma/client';
import { AllowancesService } from './allowances.service';
import { Public } from 'src/auth/common/decorators';

@Public()
@Controller('allowances')
export class AllowancesController {
  constructor(private readonly allowancesService: AllowancesService) {}

  @Post()
  async createAllowance(
    @Body() createAllowanceDto: Allowance,
  ): Promise<Allowance> {
    return this.allowancesService.createAllowance(createAllowanceDto);
  }

  @Get()
  findAll() {
    return this.allowancesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.allowancesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAllowanceDto: Allowance,
  ) {
    return this.allowancesService.update(id, updateAllowanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.allowancesService.remove(id);
  }

  @Get('/getUser/:id')
  find(@Param('id') id: string): Promise<User> {
    return this.allowancesService.find(id);
  }
}
