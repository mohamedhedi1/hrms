import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Project, type Prisma } from '@prisma/client';
import { CreateProjectManagementDto } from './dto/create-project-management.dto';
import { UpdateProjectManagementDto } from './dto/update-project-management.dto';
import { log } from 'console';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectManagementService {
  constructor(private readonly prisma: PrismaService) {
    let includePosts: boolean = false;
    let project: Prisma.ProjectCreateInput;
  }

  async create(createProjectDto: Project) {
    const { usersIds, ...rest } = createProjectDto;

    const usersConnect = usersIds
      ? usersIds.map((userId) => ({ id: userId.toString() }))
      : [];

    return await this.prisma.project.create({
      data: {
        ...rest,
        users: {
          connect: usersConnect,
        },
      },
      select: {
        id: true,
        users: true,
      },
    });
  }

  async getAllProjects() {
    return await this.prisma.project.findMany();
  }

  async getProjectById(projectId: string) {
    return await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });
  }

  async update(projectId: string, updateProjectDto: Project) {
    const { usersIds, ...rest } = updateProjectDto;
    console.log(usersIds);

    // Check if users is defined before mapping over it
    const usersConnect = usersIds
      ? usersIds.map((userId) => ({ id: userId.toString() }))
      : [];

    return await this.prisma.project.update({
      where: { id: projectId }, // Provide the project ID to identify the project to update
      data: {
        ...rest,
        users: {
          connect: usersConnect,
        },
      },
      select: {
        id: true,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} projectManagement`;
  }
}
