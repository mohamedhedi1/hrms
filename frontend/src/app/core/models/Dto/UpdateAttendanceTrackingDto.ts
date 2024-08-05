import { ShiftType } from '../attendanceRecord';
import { User } from '../User';

export enum Status {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
}

export class CreateAttendanceTrackingDto {
  date!: string;
  shiftType!: ShiftType | null;
  status!: Status;
  absent_reason?: string;
  userId!: string;
}
