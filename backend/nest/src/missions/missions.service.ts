import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MissionService {
  constructor(private prisma: PrismaService) {}

  async getUserIdByEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    return { id: user.id };
  }

  async getAvailableUsers() {
    return await this.prisma.user.findMany({
      where: {
        available: true,
      },
    });
  }

  async getAllMissions() {
    return await this.prisma.mission.findMany();
  }

  async assignUserToMission(data: any) {
    await this.prisma.mission.update({
      where: {
        id: data.id,
      },
      data: {
        userId: data.userId,
      },
    });
  }

  async create(mission: any) {
    await this.prisma.mission.create({
      data: {
        title: mission.title,
        description: mission.description,
        startDate: mission.startDate,
        endDate: mission.endDate,
        status: 'PENDING',
        client: mission.client,
        userId: mission.userId,
      },
    });
    for (const id of mission.userId) {
      await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          available: false,
        },
      });
    }
  }

  async assignClientToMission(clientId: string, idMission: string) {
    await this.prisma.mission.update({
      where: {
        id: idMission,
      },
      data: {
        client: clientId,
      },
    });
  }

  deleteMission(missionId: string) {
    this.prisma.mission.delete({
      where: {
        id: missionId,
      },
    });
  }

  async getUserNameById(userId: string): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        firstname: true,
        lastname: true,
      },
    });
    return `${user.firstname} ${user.lastname}`;
  }
}
