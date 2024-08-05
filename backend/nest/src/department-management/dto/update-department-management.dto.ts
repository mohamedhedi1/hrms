import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartmentManagementDto } from './create-department-management.dto';

export class UpdateDepartmentManagementDto extends PartialType(CreateDepartmentManagementDto) {}
