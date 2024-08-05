import { Config, ConfigProps } from '@application/entities/config';
import { faker } from '@faker-js/faker';
import generate from 'bson-objectid';

export class ConfigFactory {
  static make(props?: Partial<ConfigProps>): Config {
    return new Config({
      id: generate().toHexString(),
      companyName: faker.company.companyName(),
      cnssrib: faker.lorem.word(),
      payDay: faker.date.future(),
      delayPayment: 2,
      cssrate: 1,
      ...props,
    });
  }
}
