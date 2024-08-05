import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dtos/CreateRole.dto';
import { RoleResponseDto } from './dtos/RoleResponse.dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  deteteRole(id: string) {
    return this.prisma.role.deleteMany({
      where: {
        id: id,
      },
    });
  }

  getRoleById(id: string) {
    return this.prisma.role.findUnique({
      where: {
        id: id,
      },
      include: {
        privileges: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async updateRole(userId: string, updateRoleDto: any) {
    return await this.prisma.role.update({
      where: {
        id: userId,
      },
      data: {
        name: updateRoleDto.name,
        privilegeId: updateRoleDto.privilegeId,
      },
    });
  }
  async createRole(createRoleDto: CreateRoleDto): Promise<RoleResponseDto> {
    try {
      const createdRole = await this.prisma.role.create({
        data: {
          name: createRoleDto.name,
          privileges: {
            connect: createRoleDto.privileges.map((id) => ({ id })),
          },
        },
        include: {
          privileges: true,
        },
      });

      const response: RoleResponseDto = {
        id: createdRole.id,
        name: createdRole.name,
        privileges: createdRole.privileges.map((privilege) => ({
          id: privilege.id,
          name: privilege.name,
        })),
      };

      return response;
    } catch (error) {
      console.error('Error creating role:', error);
      throw error;
    }
  }

  getRoles() {
    return this.prisma.role.findMany({
      include: {
        privileges: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}
