import { Allowance } from '@application/entities/allowance';
import { AllowancesRepository } from '@application/repositories/allowances-repository';

export class InMemoryAllowancesRepository implements AllowancesRepository {
  public allowances: Allowance[];

  constructor() {
    this.allowances = [];
  }

  async create(allowance: Allowance): Promise<void> {
    this.allowances.push(allowance);
  }

  async findById(allowanceId: string): Promise<Allowance | null> {
    const allowance = this.allowances.find((item) => item.id === allowanceId);

    if (!allowance) {
      return null;
    }

    return allowance;
  }

  async findAllByPayrollId(payrollId: string): Promise<Allowance[]> {
    return this.allowances.filter((item) => item.payrollId === payrollId);
  }

  async update(allowance: Allowance): Promise<void> {
    const index = this.allowances.findIndex((item) => item.id === allowance.id);

    if (index >= 0) {
      this.allowances[index] = allowance;
    }
  }

  async delete(allowanceId: string): Promise<void> {
    this.allowances = this.allowances.filter((item) => item.id !== allowanceId);
  }
}
