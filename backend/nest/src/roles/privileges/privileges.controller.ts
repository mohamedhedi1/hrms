import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrivilegesService } from './privileges.service';
import { Privilege } from '../dtos/Privilege';
import { Public } from 'src/auth/common/decorators/public.decorator';

@Controller('privileges')
export class PrivilegesController {
    constructor(private privilegesService : PrivilegesService){}

      //@SetMetadata('authorities', ['view roles'])
      @Public()
      @Get()
      getPrivileges(): Promise<Privilege[]>{
          return this.privilegesService.getPrivileges();
      }
  
  
      //@SetMetadata('authorities', ['add roles'])
      @Public()
      @Post()
      createPrivileges(@Body() Privilege : Privilege)
      {
          return this.privilegesService.createPrivileges(Privilege);  
      }
}
