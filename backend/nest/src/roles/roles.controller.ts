import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dtos/CreateRole.dto';
import { Public } from 'src/auth/common/decorators/public.decorator';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  getRoles() {
    return this.rolesService.getRoles();
  }

  //@SetMetadata('authorities', ['add roles'])
  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }

  @Delete(':id')
  deteteRole(@Param('id') id: string) {
    return this.rolesService.deteteRole(id);
  }
  @Get(':id')
  getRoleById(@Param('id') id: string) {
    return this.rolesService.getRoleById(id);
  }

  @Patch(':id')
  async updateRole(@Param('id') userId: string, @Body() updateRoleDto: any) {
    return await this.rolesService.updateRole(userId, updateRoleDto);
  }
}
