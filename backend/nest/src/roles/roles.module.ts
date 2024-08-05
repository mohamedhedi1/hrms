import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { PrivilegesController } from './privileges/privileges.controller';
import { PrivilegesService } from './privileges/privileges.service';

@Module({
  controllers: [RolesController, PrivilegesController],
  providers: [RolesService, PrivilegesService]
})
export class RolesModule {}
