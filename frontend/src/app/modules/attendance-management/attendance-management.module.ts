import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceManagementRoutingModule } from './attendance-management-routing.module';
import { AddAttendanceComponent } from './add-attendance/add-attendance.component';
import { UpdateAttendanceComponent } from './update-attendance/update-attendance.component';
import { ListAttendanceComponent } from './list-attendance/list-attendance.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateAttendanceComponent } from './create-attendance/create-attendance.component';
import { AttendanceTrackingService } from '../../core/services/attendance-tracking.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatHeaderCell,
  MatHeaderRow,
  MatTableModule,
} from '@angular/material/table';

@NgModule({
  declarations: [
    AddAttendanceComponent,
    UpdateAttendanceComponent,
    ListAttendanceComponent,
    CreateAttendanceComponent,
  ],
  imports: [
    CommonModule,
    AttendanceManagementRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    MatPaginator,
    MatTableModule,
    MatHeaderCell,
    MatHeaderRow,
  ],
  providers: [AttendanceTrackingService, MessageService],
})
export class AttendanceManagementModule {}
