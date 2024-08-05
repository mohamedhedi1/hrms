import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { AttendanceTrackingService } from './attendance-tracking.service';
import { UpdateAttendanceTrackingDto } from './dto/update-attendance-tracking.dto';
import { Public } from '../auth/common/decorators/public.decorator';

import { PrismaService } from 'src/prisma/prisma.service';
import { AttendanceRecord, User } from '@prisma/client';
import { CreateAttendanceTrackingDto } from './dto/create-attendance-tracking.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
@Public()
@Controller('attendance-tracking')
export class AttendanceTrackingController {
  constructor(
    private readonly attendanceTrackingService: AttendanceTrackingService,
    private readonly prisma: PrismaService,
  ) {}
  @Post('create/:userId')
  async createAttendance(
    @Param('userId') userId: string,
    @Body() createAttendanceDto: CreateAttendanceTrackingDto,
  ) {
    return this.attendanceTrackingService.createAttendance(
      userId,
      createAttendanceDto,
    );
  }
  @Post(':id')
  create(
    @Param('id') id: string,
    @Body() createAttendanceTrackingDto: CreateAttendanceTrackingDto,
  ): Promise<AttendanceRecord> {
    return this.attendanceTrackingService.create(
      id,
      createAttendanceTrackingDto,
    );
  }

  @Get()
  findAll() {
    return this.attendanceTrackingService.findAll();
  }

  /*@Patch(':id')
  updateZ(
    @Param('id') id: string,
    @Body() updateAttendanceTrackingDto: UpdateAttendanceTrackingDto,
  ) {
    return this.attendanceTrackingService.update(
      id,
      updateAttendanceTrackingDto,
    );
  }*/

  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.attendanceTrackingService.remove(id);
  }
  @Get('/getUser/:id')
  find(@Param('id') id: string): Promise<User> {
    return this.attendanceTrackingService.find(id);
  }
  @Get('/users')
  findAllUsers(): Promise<User> {
    return this.attendanceTrackingService.findAllUsers();
  }

  @Put('/updateAttendance/:id')
  async updateAttendance(
    @Param('id') id: string,
    @Body() updateAttendanceTrackingDto: AttendanceRecord,
  ): Promise<AttendanceRecord | any> {
    try {
      const updatedRecord = await this.prisma.attendanceRecord.update({
        where: { id: id },
        data: {
          date: updateAttendanceTrackingDto.date,
          shiftType: updateAttendanceTrackingDto.shiftType,
          status: updateAttendanceTrackingDto.status,
          absent_reason: updateAttendanceTrackingDto.absent_reason,
          userId: updateAttendanceTrackingDto.userId,
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
      return updatedRecord;
    } catch (error) {
      console.error('Error updating attendance record:', error);
      throw new Error('Failed to update attendance record');
    }
  }
  @Get('/getUserByEmail/:email')
  getUserIdByEmail(@Param('email') email: string): Promise<String | any> {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    });
  }
  @Get('total-half-shift-days/:userId')
  async getTotalHalfShiftDaysForUserInMonth(
    @Param('userId') userId: string,
    @Query('month') month: number,
  ): Promise<{
    halfShifts: number;
    fullShifts: number;
    quarterShifts: number;
    absences: number;
  }> {
    return await this.attendanceTrackingService.getTotalShiftsForUserInMonth(
      userId,
      month,
    );
  }
 
  @Get('with-attendance')
  async findAllWithAttendance(): Promise<any[]> {
    return this.prisma.user.findMany({
      include: {
        attendanceRecord: true,
      },
    });
  }
  @Get(':month/:year')
  findUsersAttendance(
    @Param('month') month: number,
    @Param('year') year: number,
  ): Promise<any[]> {
    return this.attendanceTrackingService.findUsersAttendance(month, year);
  }
  @Get('/:userId')
  async getAttendanceByEmployeeIdAndDate(
    @Param('userId') userId: string,
    @Query('date') date: string,
  ): Promise<AttendanceRecord | null> {
    return this.attendanceTrackingService.getAttendanceByUserIdAndDate(
      userId,
      date,
    );
  }
  @Cron(CronExpression.EVERY_DAY_AT_5PM)
  async remindUsers() {
    const users = await this.findAllWithAttendance();
    console.log('bonjour'); // Fetch all users

    for (const user of users) {
      console.log(user.number);
      const todayAttendance =
        await this.attendanceTrackingService.getAttendanceByUserIdAndDate(
          user.id,
          new Date().toISOString().split('T')[0],
        );

      if (!todayAttendance) {
        const number = '+216' + user.number;
        const message =
          'Hey ' +
          user.firstname +
          "! It seems like you haven't logged your attendance for today yet. Could you please take a moment to do so?";
        console.log('asaa' + number);
        // User didn't create attendance today, send a reminder message
        this.sendReminderMessage(number);
      }
    }
  }
  private sendReminderMessage(number) {


   
    const accountSid = '';
    const authToken = '';
    const client = require('twilio')(accountSid, authToken);
    client.messages
      .create({
        body: "Hey there! It seems like you haven't logged your attendance for today yet. Could you please take a moment to do so?",
        from: '+19062873999',
        to: number,
      })
      .then((message) => console.log(message.sid));
  }

  @Get(':userId/:month')
  async getAttendanceByUserAndMonth(
    @Param('userId') userId: string,
    @Param('month') month: number,
  ) {
    // Convert month to a 0-based index for JavaScript Date
    const startDate = new Date(new Date().getFullYear(), month - 1, 1);
    const endDate = new Date(new Date().getFullYear(), month, 0);

    // Format dates as "dd-mm-yy" (day-month-year)
    const startDateFormatted = this.formatDate(startDate);
    const endDateFormatted = this.formatDate(endDate);

    // Fetch attendance records for the specified user and month
    const attendanceRecords = await this.prisma.attendanceRecord.findMany({
      where: {
        userId,
        // Filter by date range for the month
        // Use Prisma's 'gte' and 'lte' operators to filter within a range
        date: {
          gte: startDateFormatted,
          lte: endDateFormatted,
        },
      },
    });

    return attendanceRecords;
  }

  // Helper method to format date as "dd-mm-yy"
  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  }
}
