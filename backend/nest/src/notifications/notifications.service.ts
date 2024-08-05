import { Injectable } from '@nestjs/common';
import { Notification } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async createNotification(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    const { recipientId, content, category, action } = createNotificationDto;
    return this.prisma.notification.create({
      data: {
        recipientId,
        content,
        category,
        action,
      },
    });
  }

  async readNotification(id: string): Promise<Notification> {
    return this.updateNotification(id, { readAt: new Date() });
  }

  async unreadNotification(id: string): Promise<Notification> {
    return this.updateNotification(id, { readAt: null });
  }

  async cancelNotification(id: string): Promise<Notification> {
    return this.updateNotification(id, { canceledAt: new Date() });
  }

  async readAllNotifications(): Promise<Notification[]> {
    return this.updateAllNotifications({ readAt: new Date() });
  }

  async cancelAllNotifications(): Promise<Notification[]> {
    return this.updateAllNotifications({ canceledAt: new Date() });
  }

  async getNotificationsByRecipientId(
    recipientId: string,
  ): Promise<Notification[]> {
    return this.prisma.notification.findMany({
      where: {
        recipientId: recipientId,
      },
    });
  }

  async getReadNotifications(): Promise<Notification[]> {
    return this.prisma.notification.findMany({
      where: {
        readAt: { not: null },
      },
    });
  }

  private async updateNotification(
    id: string,
    data: any,
  ): Promise<Notification> {
    return this.prisma.notification.update({
      where: { id },
      data,
    });
  }

  private async updateAllNotifications(data: any): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany();
    const updatePromises = notifications.map((notification) =>
      this.prisma.notification.update({
        where: { id: notification.id },
        data,
      }),
    );
    return Promise.all(updatePromises);
  }
}
