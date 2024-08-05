import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAttendanceTrackingDto } from './dto/create-attendance-tracking.dto';
import { AttendanceRecord, User, PrismaClient, Status } from '@prisma/client';
import { type Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AttendanceTrackingService {
  constructor(private readonly prisma: PrismaService) {
    let includePosts: boolean = false;
    let attendanceRecord: Prisma.AttendanceRecordCreateInput;
    let employe: Prisma.UserCreateInput;
  }
  async createAttendance(
    userId: string,
    createAttendanceTrackingDto: CreateAttendanceTrackingDto,
  ): Promise<AttendanceRecord | any> {
    const createdRecord = await this.prisma.attendanceRecord.create({
      data: {
        date: createAttendanceTrackingDto.date,
        shiftType: createAttendanceTrackingDto.shiftType,
        status: createAttendanceTrackingDto.status,
        absent_reason: createAttendanceTrackingDto.absent_reason,
        user: {
          connect: { id: userId },
        },
      },
      select: {
        id: true,
        date: true,
        shiftType: true,
        status: true,
        absent_reason: true,
        userId: true,
      },
    });
    return createdRecord;
  }
  async create(
    userId: string,
    createAttendanceTrackingDto: CreateAttendanceTrackingDto,
  ): Promise<AttendanceRecord | any> {
    try {
      const currentDate = new Date().toISOString().split('T')[0];

      const existingRecord = await this.prisma.attendanceRecord.findFirst({
        where: {
          date: currentDate,
          userId: userId,
        },
      });

      if (existingRecord) {
        return {
          message: 'You already created an attendance for today.',
        };
      }

      // Create the attendance record
      const createdRecord = await this.prisma.attendanceRecord.create({
        data: {
          date: currentDate,
          shiftType: createAttendanceTrackingDto.shiftType,
          status: createAttendanceTrackingDto.status,
          absent_reason: createAttendanceTrackingDto.absent_reason,
          user: {
            connect: { id: userId },
          },
        },
        select: {
          id: true,
          date: true,
          shiftType: true,
          status: true,
          absent_reason: true,
        },
      });
      return createdRecord;
    } catch (error) {
      console.error('Error creating attendance record:', error);
      throw new Error('Failed to create attendance record');
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
        attendanceRecord: true,
        projectIds: true,
      },
    });
  }
  async updateUserWithAttendance(id: string, UserData: User): Promise<User> {
    try {
      // Find the User by ID
      const existingUser = await this.prisma.user.findUnique({
        where: { id },
        include: { attendanceRecord: true },
      });

      if (!existingUser) {
        throw new Error(`User with ID ${id} not found`);
      }

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: UserData,
      });

      // Update attendance records
      await Promise.all(
        existingUser.attendanceRecord.map(async (record) => {
          await this.prisma.attendanceRecord.update({
            where: { id: record.id },
            data: {},
          });
        }),
      );

      return updatedUser;
    } catch (error) {
      console.error('Error updating User with attendance:', error);
      throw new Error('Failed to update User with attendance');
    }
  }

  async findAll(): Promise<AttendanceRecord[]> {
    return this.prisma.attendanceRecord.findMany();
  }

  async findAllUsers(): Promise<
    (User & { attendanceRecords: AttendanceRecord[] })[] | any
  > {
    try {
      const Users = await this.prisma.user.findMany({
        include: {
          attendanceRecord: true,
        },
      });
      return Users;
    } catch (error) {
      console.error('Error fetching Users:', error);
      return 'Error fetching Users';
    }
  }
  async getTotalShiftsForUserInMonth(
    userId: string,
    month: number,
  ): Promise<{
    halfShifts: number;
    fullShifts: number;
    quarterShifts: number;
    absences: number;
  }> {
    try {
      const monthStr = month.toString().padStart(2, '0');

      const records = await this.prisma.attendanceRecord.findMany({
        where: {
          userId,
          date: {
            contains: `2024-${monthStr}-`,
          },
        },
      });

      console.log('Fetched records:', records);

      const halfShiftRecords = records.filter(
        (record) => record.shiftType === 'HALF_DAY',
      );
      const fullShiftRecords = records.filter(
        (record) => record.shiftType === 'FULL_DAY',
      );
      const quarterShiftRecords = records.filter(
        (record) => record.shiftType === 'QUARTER_SHIFT',
      );
      const AbsentStatus = records.filter(
        (record) => record.status === 'ABSENT',
      );

      console.log('Filtered records:', halfShiftRecords);

      return {
        halfShifts: halfShiftRecords.length,
        fullShifts: fullShiftRecords.length,
        quarterShifts: quarterShiftRecords.length,
        absences: AbsentStatus.length,
      };
    } catch (error) {
      console.error('Error fetching shifts:', error);
      throw error; // Rethrow the error to propagate it to the caller
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const deletedRecord = await this.prisma.attendanceRecord.delete({
        where: {
          id: id,
        },
      });

      // If a record is returned, deletion was successful
      return true;
    } catch (error) {
      console.error('Error deleting attendance record:', error);
      throw new Error('Failed to delete attendance record');
    }
  }
  async findUsersAttendance(month: number, year: number) {
    try {
      const startDate = new Date(`${year}-${month}-01`);
      const endDate = new Date(year, month, 0);
      const attendanceRecords = await this.prisma.attendanceRecord.findMany({
        where: {
          AND: [
            { date: { gte: startDate.toISOString() } },
            { date: { lt: endDate.toISOString() } },
          ],
        },
        include: {
          user: true,
        },
      });

      const UsersAttendance = attendanceRecords.reduce((acc, record) => {
        const { user } = record;
        if (!acc[user.id]) {
          acc[user.id] = {
            UserId: user.id,
            firstName: user.firstname,
            lastName: user.lastname,
            attendanceRecord: [record],
          };
        } else {
          acc[user.id].attendanceRecord.push(record);
        }
        return acc;
      }, {});

      const result = Object.values(UsersAttendance);

      return result;
    } catch (error) {
      throw new Error(`Failed to fetch Users attendance: ${error.message}`);
    }
  }
  async getAttendanceByUserIdAndDate(
    UserId: string,
    date: string,
  ): Promise<AttendanceRecord | null> {
    try {
      const attendanceRecord = await this.prisma.attendanceRecord.findFirst({
        where: {
          userId: UserId,
          date: date,
        },
      });

      return attendanceRecord;
    } catch (error) {
      console.error('Error fetching attendance record:', error);
      throw new Error('Failed to fetch attendance record');
    }
  }
}
