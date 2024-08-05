import { User } from './User';

export class Payroll {
  id!: string;
  userId!: string;
  month!: string;
  taxableSalary!: number;
  cnssdeduction!: number;
  irpp!: number;
  css!: number;
  netSalary!: number;
  user?: User;
}
