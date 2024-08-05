import { Deduction } from '@application/entities/deduction';
import { DeductionsRepository } from '@application/repositories/deductions-repository';

export class InMemoryDeductionsRepository implements DeductionsRepository {
  public deductions: Deduction[];

  constructor() {
    this.deductions = [];
  }

  async create(deduction: Deduction): Promise<void> {
    this.deductions.push(deduction);
  }

  async findById(deductionId: string): Promise<Deduction | null> {
    const deduction = this.deductions.find((item) => item.id === deductionId);

    if (!deduction) {
      return null;
    }

    return deduction;
  }

  async findAllByPayrollId(payrollId: string): Promise<Deduction[]> {
    return this.deductions.filter((item) => item.payrollId === payrollId);
  }

  async update(deduction: Deduction): Promise<void> {
    const index = this.deductions.findIndex((item) => item.id === deduction.id);

    if (index >= 0) {
      this.deductions[index] = deduction;
    }
  }

  async delete(deductionId: string): Promise<void> {
    this.deductions = this.deductions.filter((item) => item.id !== deductionId);
  }
}
