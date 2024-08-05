import { Payroll } from '@application/entities/payroll';
import { PayrollsRepository } from '@application/repositories/payrolls-repository';

export class InMemoryPayrollsRepository implements PayrollsRepository {
  public payrolls: Payroll[];

  constructor() {
    this.payrolls = [];
  }

  async create(payroll: Payroll): Promise<void> {
    this.payrolls.push(payroll);
  }
}
