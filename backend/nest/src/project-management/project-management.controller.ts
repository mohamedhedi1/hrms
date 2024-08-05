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
import { ProjectManagementService } from './project-management.service';
import { CreateProjectManagementDto } from './dto/create-project-management.dto';
import { UpdateProjectManagementDto } from './dto/update-project-management.dto';
import { Project } from '@prisma/client';

@Controller('project-management')
export class ProjectManagementController {
  constructor(
    private readonly projectManagementService: ProjectManagementService,
  ) {}

  @Post()
  create(@Body() createProjectManagementDto: Project) {
    return this.projectManagementService.create(createProjectManagementDto);
  }

  @Get()
  findAll() {
    return this.projectManagementService.getAllProjects();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectManagementService.getProjectById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProjectManagementDto: Project) {
    return this.projectManagementService.update(id, updateProjectManagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectManagementService.remove(+id);
  }
}
