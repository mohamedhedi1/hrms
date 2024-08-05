import {
  Notification,
  NotificationProps,
} from './../../src/application/entities/notification';
import { faker } from '@faker-js/faker';
import generate from 'bson-objectid';

export class NotificationFactory {
  static make(props?: Partial<NotificationProps>): Notification {
    return new Notification({
      recipientId: generate().toHexString(),
      content: faker.lorem.sentence(3),
      category: 'social',
      ...props,
    });
  }
}
