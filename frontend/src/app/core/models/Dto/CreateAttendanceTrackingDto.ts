import { ShiftType } from '../attendanceRecord';
import { User } from '../User';

export enum Status {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
}

export class CreateAttendanceTrackingDto {
  date!: string;
  shiftType!: ShiftType | string | null;
  status!: Status;
  absent_reason?: string | null;
  userId!: string;
}
