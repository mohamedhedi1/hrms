import { Deduction, DeductionProps } from '@application/entities/deduction';
import { faker } from '@faker-js/faker';
import generate from 'bson-objectid';

export class DeductionFactory {
  static make(props?: Partial<DeductionProps>): Deduction {
    return new Deduction({
      payrollId: generate().toHexString(),
      description: faker.lorem.sentence(3),
      amount: 3,
      ...props,
    });
  }
}
