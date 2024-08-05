import { ShiftType } from '@prisma/client';

export enum Status {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
}

export class CreateAttendanceTrackingDto {
  date: string;
  shiftType: ShiftType | null;
  status: Status;
  absent_reason?: string | null;
  userId: string;
}
