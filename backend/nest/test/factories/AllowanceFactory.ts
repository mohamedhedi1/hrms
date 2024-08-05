import { Allowance, AllowanceProps } from '@application/entities/allowance';
import { faker } from '@faker-js/faker';
import generate from 'bson-objectid';

export class AllowanceFactory {
  static make(props?: Partial<AllowanceProps>): Allowance {
    return new Allowance({
      payrollId: generate().toHexString(),
      description: faker.lorem.sentence(3),
      amount: 3,
      ...props,
    });
  }
}
