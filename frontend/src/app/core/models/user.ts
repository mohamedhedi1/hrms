import { Allowance } from './allowance';
import { AttendanceRecord } from './attendanceRecord';
import { Deduction } from './deduction';
import { Payroll } from './payroll';
import { Project } from './project';
export class User {
  id!: string;
  firstname!: string;
  lastname!: string;
  email?: string;
  attendanceRecord!: AttendanceRecord[];
  project!: Project[];
  payrolls!: Payroll[];
  allowances!: Allowance[];
  deductions!: Deduction[];
  basicSalary!: number;
  offDays!: number;
  familySituation!: number;
  childrenNumber!: number;
  bankrib!: string;
  numCnss!: string;
}
