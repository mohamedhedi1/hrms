import {
  Payroll,
  PayrollProps,
} from './../../src/application/entities/payroll';
import { faker } from '@faker-js/faker';
import generate from 'bson-objectid';

export class PayrollFactory {
  static make(props?: Partial<PayrollProps>): Payroll {
    return new Payroll({
      userId: generate().toHexString(), // Assuming userId is of type string
      month: new Date(), // Assuming month is of type Date
      basicSalary: faker.datatype.number(), // Example generation of basicSalary
      cnssDeduction: faker.datatype.number(), // Example generation of cnssDeduction
      taxableSalary: faker.datatype.number(), // Example generation of taxableSalary
      irpp: faker.datatype.number(), // Example generation of irpp
      css: faker.datatype.number(), // Example generation of css
      allowances: [], // Assuming allowances is an array of Allowance entities
      deductions: [], // Assuming deductions is an array of Deduction entities
      netSalary: faker.datatype.number(), // Example generation of netSalary
      ...props,
    });
  }
}
