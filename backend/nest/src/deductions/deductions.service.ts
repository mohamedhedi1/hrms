import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Deduction } from '@prisma/client';

@Injectable()
export class DeductionsService {
  constructor(private readonly prisma: PrismaService) {}

  async createDeduction(createDeductionDto: Deduction): Promise<Deduction> {
    const { userId, description, amount, date } = createDeductionDto;
    return this.prisma.deduction.create({
      data: {
        userId,
        description,
        amount,
        date,
      },
    });
  }

  async findAll(): Promise<Deduction[]> {
    return this.prisma.deduction.findMany({
      select: {
        id: true,
        userId: true,
        description: true,
        amount: true,
        date: true,
        user: true,
      },
    });
  }

  async findOne(id: string): Promise<Deduction | string> {
    try {
      const record = await this.prisma.deduction.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          userId: true,
          description: true,
          amount: true,
          date: true,
          user: true,
        },
      });

      if (!record) {
        return `Deduction with ID ${id} not found`;
      }

      return record;
    } catch (error) {
      console.error('Error fetching deduction:', error);
      throw new Error('Failed to fetch deduction');
    }
  }

  async update(
    id: string,
    updateDeductionDto: Deduction,
  ): Promise<Deduction | any> {
    try {
      const updatedDeduction = await this.prisma.deduction.update({
        where: { id: id },
        data: {
          userId: updateDeductionDto.userId,
          description: updateDeductionDto.description,
          amount: updateDeductionDto.amount,
          date: updateDeductionDto.date,
        },
        select: {
          id: true,
          userId: true,
          description: true,
          amount: true,
          date: true,
        },
      });
      return updatedDeduction;
    } catch (error) {
      console.error('Error updating deduction:', error);
      throw new Error('Failed to update deduction');
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.deduction.delete({
        where: {
          id: id,
        },
      });

      return true;
    } catch (error) {
      console.error('Error deleting deduction:', error);
      throw new Error('Failed to delete deduction');
    }
  }
}
