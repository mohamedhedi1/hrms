import { Component, OnDestroy, OnInit } from '@angular/core';
import { AttendanceTrackingService } from '../../../core/services/attendance-tracking.service';
import { User } from '../../../core/models/User';
import {
  AttendanceRecord,
  ShiftType,
  Status,
} from '../../../core/models/attendanceRecord';
import { CreateAttendanceTrackingDto } from '../../../core/models/Dto/CreateAttendanceTrackingDto';

import { Subscription, interval, switchMap } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-attendance',
  templateUrl: './update-attendance.component.html',
  styleUrls: ['./update-attendance.component.css'],
})
export class UpdateAttendanceComponent implements OnInit, OnDestroy {
  monthData: MonthData[] = [];
  users: User[] = [];
  daysInMonth: number[] = [];
  currentMonthYear: string = '';
  selectedDate: Date = new Date();
  user!: User;
  day!: number;
  isModalOpened: boolean = false;
  status!: string;
  selectedDuration!: ShiftType;
  private refreshSubscription: Subscription;

  constructor(
    private attendanceService: AttendanceTrackingService,
    private messageService: MessageService
  ) {
    this.refreshSubscription = this.attendanceService.refreshNeeded.subscribe(
      () => {
        this.loadAttendanceRecords();
      }
    );
  }
  ngOnDestroy(): void {
    this.refreshSubscription.unsubscribe();
  }

  ngOnInit() {
    this.generateMonthData(this.selectedDate);
    this.loadAttendanceRecords();
  }
  showWarningToast(message: string): void {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warning',
      detail: message,
      life: 5000,
      styleClass: 'custom-toast',
    });
  }

  showSuccessToast(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
      life: 5000,
      styleClass: 'custom-toast',
    });
  }
  choose(i: number) {
    console.log(i);
    if (i == 1) {
      this.status = Status.PRESENT;
      this.selectedDuration = ShiftType.HALF_DAY;
    } else if (i == 2) {
      this.status = Status.PRESENT;
      this.selectedDuration = ShiftType.QUARTER_SHIFT;
    } else if (i == 3) {
      this.status = Status.PRESENT;
      this.selectedDuration = ShiftType.FULL_DAY;
    } else {
      this.status = Status.ABSENT;
    }
  }
  loadAttendanceRecords() {
    this.attendanceService.findAllUsers().subscribe({
      next: (data: User[]) => {
        console.log(data);
        this.users = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }
  getStatusForDay(user: User, day: number, monthIndex: number): string {
    // Filter attendance records for the current month and user
    const attendanceRecordsForMonth = user.attendanceRecord.filter((record) => {
      const recordDate = new Date(record.date);
      return (
        recordDate.getMonth() === monthIndex && recordDate.getDate() === day
      );
    });

    // Get the status for the filtered attendance record
    const attendanceRecordForDay =
      attendanceRecordsForMonth.length > 0
        ? attendanceRecordsForMonth[0].status
        : '';
    return attendanceRecordForDay;
  }
  isWeekend(day: number): boolean {
    const date = new Date(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth(),
      day
    );
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // 0 is Sunday, 6 is Saturday
  }
  getShiftTypeForDay(user: User, day: number, monthIndex: number): '' | any {
    const attendanceRecordsForMonth = user.attendanceRecord.filter((record) => {
      const recordDate = new Date(record.date);
      return (
        recordDate.getMonth() === monthIndex && recordDate.getDate() === day
      );
    });

    const attendanceRecordForDay =
      attendanceRecordsForMonth.length > 0
        ? attendanceRecordsForMonth[0].shiftType
        : '';

    return attendanceRecordForDay !== '' ? attendanceRecordForDay : null;
  }

  generateMonthData(date: Date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    const days = new Date(year, month + 1, 0).getDate();

    this.daysInMonth = Array.from({ length: days }, (_, i) => i + 1);

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    this.currentMonthYear = `${monthNames[month]} ${year}`;

    const monthData: MonthData = {
      monthName: this.currentMonthYear,
      monthIndex: month,
      days: this.daysInMonth,
      users: this.users,
    };

    this.monthData.push(monthData);
  }

  switchMonth(delta: number) {
    this.monthData = [];
    this.selectedDate.setMonth(this.selectedDate.getMonth() + delta);
    this.generateMonthData(this.selectedDate);
  }
  openModal(user: User, day: number, status: string) {
    console.log(user, day, status);
    this.status = status;
    this.user = user;
    this.day = day;

    this.isModalOpened = true;
  }
  handleUpdate(selectedDuration: ShiftType) {
    const year = this.selectedDate.getFullYear();
    const month = this.selectedDate.getMonth() + 1; // Adding 1 because months are zero-indexed
    const formattedDay = this.day < 10 ? `0${this.day}` : this.day; // Ensure day has leading zero if needed
    const dateStr = `${year}-${month < 10 ? '0' : ''}${month}-${formattedDay}`; // Construct date string

    this.attendanceService
      .getAttendanceByUserIdAndDate(this.user.id, dateStr)
      .subscribe(
        (attendanceRecord: AttendanceRecord | null) => {
          console.log(this.user.id);
          console.log(dateStr); // Log the constructed date string
          if (attendanceRecord && this.status == 'PRESENT') {
            console.log(attendanceRecord.id);

            const updateDto: CreateAttendanceTrackingDto = {
              date: dateStr,
              absent_reason: null,
              shiftType: selectedDuration,
              status: Status.PRESENT,
              userId: this.user.id, // Assign the employee's ID
              // Optionally, you can also assign the employee object
            };

            this.attendanceService
              .update(attendanceRecord.id, updateDto)
              .subscribe(
                (response) => {
                  this.showSuccessToast('Attendance updated successfully!');
                },
                (error) => {
                  this.showWarningToast('Failed to update attendance.');
                }
              );
          } else if (attendanceRecord && this.status == 'ABSENT') {
            const updateDto: CreateAttendanceTrackingDto = {
              date: dateStr,
              absent_reason: 'this attendance updated by HR',
              shiftType: null,
              status: Status.ABSENT,
              userId: this.user.id, // Assign the employee's ID
            };

            this.attendanceService
              .update(attendanceRecord.id, updateDto)
              .subscribe(
                (response) => {
                  this.showSuccessToast('Attendance updated successfully!');
                },
                (error) => {
                  this.showWarningToast('Failed to update attendance.');
                }
              );
          } else {
            const createDto: CreateAttendanceTrackingDto = {
              date: dateStr,
              shiftType: this.selectedDuration,
              status: Status[this.status as keyof typeof Status],
              absent_reason: null,
              userId: this.user.id,
            };

            this.attendanceService
              .createAttendance(createDto.userId, createDto)
              .subscribe(
                (response) => {
                  this.showSuccessToast('Attendance updated successfully!');
                },
                (error) => {
                  this.showWarningToast('Failed to update attendance.');
                }
              );
          }
        },
        (error) => {
          this.showWarningToast(error);
        }
      );
  }
}

interface MonthData {
  monthName: string;
  monthIndex: number;
  days: number[];
  users: User[];
}
