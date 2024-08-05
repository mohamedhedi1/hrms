import { CanActivate, ExecutionContext, Injectable, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UsersService } from "src/users/users.service";



//export class PermissionsGuard{}
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request?.user) {
      const { email } = request.user;
      const userPrivileges = await this.usersService.getUserPrivilegesByEmail(email);
     
      const authorities = userPrivileges.map(privilege => privilege.name);
      
      
      const requiredAuthorities = this.reflector.get<string[]>('authorities', context.getHandler());
     

      const hasRequiredAuthorities = requiredAuthorities.every(requiredAuthority =>
        authorities.includes(requiredAuthority),
      );

      
      return hasRequiredAuthorities;
    }
    
    return false;
  }
}