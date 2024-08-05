import { Controller, Get, Post, Body, Patch, Param, Delete,Put } from '@nestjs/common';
import { DepartmentManagementService } from './department-management.service';
import { CreateDepartmentManagementDto } from './dto/create-department-management.dto';
import { UpdateDepartmentManagementDto } from './dto/update-department-management.dto';
import { Department } from '@prisma/client';
import { Public } from 'src/auth/common/decorators';

@Public()
@Controller('department-management')
export class DepartmentManagementController {
  constructor(private readonly departmentManagementService: DepartmentManagementService) {}

  @Post()
  createDepartment(@Body() createDepartmentManagementDto: CreateDepartmentManagementDto) {
    return this.departmentManagementService.createDepartment(createDepartmentManagementDto);
  }

  @Get()
  findAll() {
    return this.departmentManagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentManagementService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDepartmentManagementDto: Department) {
    return this.departmentManagementService.update(id, updateDepartmentManagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentManagementService.remove(id);
  }
}
