import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Allowance } from '@prisma/client';

@Injectable()
export class AllowancesService {
  constructor(private readonly prisma: PrismaService) {}

  async createAllowance(createAllowanceDto: Allowance): Promise<Allowance> {
    const { userId, category, description, amount, date } = createAllowanceDto;
    return this.prisma.allowance.create({
      data: {
        userId,
        category,
        description,
        amount,
        date,
      },
    });
  }

  async findAll(): Promise<Allowance[]> {
    return this.prisma.allowance.findMany({
      select: {
        id: true,
        userId: true,
        category: true,
        description: true,
        amount: true,
        date: true,
        user: true,
      },
    });
  }

  async findOne(id: string): Promise<Allowance | string> {
    try {
      const record = await this.prisma.allowance.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          userId: true,
          category: true,
          description: true,
          amount: true,
          date: true,
          user: true,
        },
      });

      if (!record) {
        return `Allowance with ID ${id} not found`;
      }

      return record;
    } catch (error) {
      console.error('Error fetching allowance:', error);
      throw new Error('Failed to fetch allowance');
    }
  }

  async update(
    id: string,
    updateAllowanceDto: Allowance,
  ): Promise<Allowance | any> {
    try {
      const updatedAllowance = await this.prisma.allowance.update({
        where: { id: id },
        data: {
          userId: updateAllowanceDto.userId,
          category: updateAllowanceDto.category,
          description: updateAllowanceDto.description,
          amount: updateAllowanceDto.amount,
          date: updateAllowanceDto.date,
        },
        select: {
          id: true,
          userId: true,
          category: true,
          description: true,
          amount: true,
          date: true,
        },
      });
      return updatedAllowance;
    } catch (error) {
      console.error('Error updating allowance:', error);
      throw new Error('Failed to update allowance');
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.allowance.delete({
        where: {
          id: id,
        },
      });

      return true;
    } catch (error) {
      console.error('Error deleting allowance:', error);
      throw new Error('Failed to delete allowance');
    }
  }

  find(id: string): Promise<any> {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        allowances: true,
        projectIds: true,
      },
    });
  }
}
