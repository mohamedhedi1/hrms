import { CreateAllowanceDto } from '../../allowances/dto/create-allowance.dto';
import { CreateDeductionDto } from '../../deductions/dto/create-deduction.dto';

export class CreatePayrollDto {
  userId: string;
  month: Date;
  basicSalary: number;
  cnssdeduction: number;
  taxableSalary: number;
  irpp: number;
  css: number;
  allowances: CreateAllowanceDto[];
  deductions: CreateDeductionDto[];
  netSalary: number;
}
