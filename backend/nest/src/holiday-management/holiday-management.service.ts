import { Injectable } from '@nestjs/common';
import { CreateHolidayManagementDto } from './dto/create-holiday-management.dto';
import { UpdateHolidayManagementDto } from './dto/update-holiday-management.dto';
import { Holiday, Prisma, Shift } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HolidayManagementService {
  constructor(private readonly prisma: PrismaService) {
    let includePosts: boolean = false;
    let holiday: Prisma.HolidayCreateInput;
  }

  async createHoliday(
    createHolidayDto: CreateHolidayManagementDto,
  ): Promise<Holiday> {
    const { name, date, duration, shift } = createHolidayDto;
    return this.prisma.holiday.create({
      data: {
        name,
        date,
        duration,
        shift,
      },
    });
  }

  async findAll(): Promise<Holiday[]> {
    return this.prisma.holiday.findMany();
  }

  async findOne(id: string): Promise<Holiday | string> {
    try {
      const record = await this.prisma.holiday.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          shift: true,
          date: true,
          name: true,
          duration: true,
        },
      });

      if (!record) {
        return 'this id : ' + id + ' Not found';
      }

      return record;
    } catch (error) {
      console.error('Error fetching holiday:', error);
      throw new Error('Failed to fetch holiday');
    }
  }

  async update(
    id: string,
    updateHolidayManagementDto: Holiday,
  ): Promise<Holiday | any> {
    try {
      const updatedHoliday = await this.prisma.holiday.update({
        where: { id: id }, // Specify which attendance record to update based on the id
        data: {
          name: updateHolidayManagementDto.name,
          date: updateHolidayManagementDto.date,
          duration: updateHolidayManagementDto.duration,
          shift: updateHolidayManagementDto.shift,
        },
        select: {
          id: true,
          date: true,
          duration: true,
          name: true,
        },
      });
      return updatedHoliday;
    } catch (error) {
      console.error('Error updating holiday:', error);
      throw new Error('Failed to update holiday');
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const deletedRecord = await this.prisma.holiday.delete({
        where: {
          id: id,
        },
      });

      // If a record is returned, deletion was successful
      return true;
    } catch (error) {
      console.error('Error deleting holiday:', error);
      throw new Error('Failed to delete holiday');
    }
  }
}
