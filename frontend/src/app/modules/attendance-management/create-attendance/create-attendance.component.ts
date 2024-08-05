import { Component, OnInit } from '@angular/core';
import {
  AttendanceRecord,
  ShiftType,
  Status,
} from '../../../core/models/attendanceRecord';
import { AttendanceTrackingService } from '../../../core/services/attendance-tracking.service';
import { User } from '../../../core/models/User';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-attendance',
  templateUrl: './create-attendance.component.html',
  styleUrl: './create-attendance.component.css',
})
export class CreateAttendanceComponent implements OnInit {
  currentDate!: Date;
  selectedStatus!: Status.PRESENT | Status.ABSENT; // Default to 'present'
  selectedShiftType!: ShiftType;
  absentReason!: string;
  id!: any;
  dateStr!: string;
  user!: User;
  halfShifts!: number;
  fullShifts!: number;
  quarterShifts!: number;
  absences!: number;
  constructor(
    private attendanceService: AttendanceTrackingService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    let p = localStorage.getItem('user');

    if (p) {
      let email = JSON.parse(p)['email'];
      this.attendanceService.getUserIdByEmail(email).subscribe((data) => {
        this.id = data.id;
        this.attendanceService
          .getTotalHalfShiftDaysForUserInMonth(this.id, month)
          .subscribe((data) => {
            this.halfShifts = data.halfShifts;
            this.fullShifts = data.fullShifts;
            this.quarterShifts = data.quarterShifts;
            this.absences = data.absences;
          });
      });
    }

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    this.dateStr = `${year}-${formattedMonth}-${formattedDay}`;
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

  showSuccessToast(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Successfully submitted your attendance!',
      life: 5000,
      styleClass: 'custom-toast',
    });
  }

  submitForm(): void {
    user: this.attendanceService.find(this.id).subscribe((data) => data);
    const selectedDuration: ShiftType = this.selectedShiftType as ShiftType;

    Object.values(ShiftType).includes(selectedDuration);

    const formData: AttendanceRecord = {
      status: this.selectedStatus,
      shiftType: selectedDuration,
      absent_reason: this.absentReason,
      id: '',
      date: this.dateStr,
      userId: this.id,
    };
    this.attendanceService.create(this.id, formData).subscribe(
      (response) => {
        if (response && response.message) {
          // Show warning toast
          this.showWarningToast(response.message);
        } else {
          // Show success toast
          this.showSuccessToast();
        }
      },
      (error) => {
        console.error('You have already :', error);
      }
    );
  }
}
