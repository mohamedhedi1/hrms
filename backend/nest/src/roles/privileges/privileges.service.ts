import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Privilege } from '../dtos/Privilege';

@Injectable()
export class PrivilegesService {
      constructor(private prisma : PrismaService) {}
    createPrivileges(Privilege: Privilege) {
        return this.prisma.privilege.create(
            {data: Privilege} 
           )
    }
    getPrivileges() : Promise<Privilege[]> {
        return this.prisma.privilege.findMany({
            select: {
                id: true,
                name: true
            }
        });
    }
      
   
}
