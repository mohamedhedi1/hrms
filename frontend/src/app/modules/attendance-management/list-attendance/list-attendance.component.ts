import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AttendanceRecord } from '../../../core/models/attendanceRecord';
import { User } from '../../../core/models/User';
import { AttendanceTrackingService } from '../../../core/services/attendance-tracking.service';

@Component({
  selector: 'app-list-attendance',
  templateUrl: './list-attendance.component.html',
  styleUrls: ['./list-attendance.component.css'],
})
export class ListAttendanceComponent implements OnInit, OnDestroy {
  @Input() user!: User;
  attendanceRecord: AttendanceRecord[] = [];
  id!: string;
  private refreshSubscription: Subscription;

  // Declare displayedColumns property and initialize it
  displayedColumns: string[] = ['date', 'status', 'absentReason', 'shift'];

  constructor(private attendanceService: AttendanceTrackingService) {
    this.refreshSubscription = this.attendanceService.refreshNeeded.subscribe(
      () => {
        this.loadAttendanceRecords();
      }
    );
  }

  ngOnInit(): void {
    this.loadAttendanceRecords();
  }

  ngOnDestroy(): void {
    this.refreshSubscription.unsubscribe();
  }

  loadAttendanceRecords(): void {
    if (!this.user) {
      let p = localStorage.getItem('user');
      if (p) {
        let email = JSON.parse(p)['email'];
        this.attendanceService.getUserIdByEmail(email).subscribe((data) => {
          this.id = data.id;
          this.attendanceService.find(this.id).subscribe((userData) => {
            this.user = userData;
          });
        });
      }
    } else {
      this.id = this.user.id;
      this.attendanceService.find(this.id).subscribe((userData) => {
        this.user = userData;
      });
    }
  }

  getAttendanceStatus(date: string): string {
    const record = this.user?.attendanceRecord.find(
      (item) => item.date === date
    );
    return record ? record.status : '';
  }
}
