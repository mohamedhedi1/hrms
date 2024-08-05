import { Controller, Get, Patch, Param, Body, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Notification } from '@prisma/client';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Public } from 'src/auth/common/decorators';

@Public()
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    return this.notificationsService.createNotification(createNotificationDto);
  }

  @Patch(':id/read')
  async readNotification(@Param('id') id: string): Promise<Notification> {
    return this.notificationsService.readNotification(id);
  }

  @Patch(':id/unread')
  async unreadNotification(@Param('id') id: string): Promise<Notification> {
    return this.notificationsService.unreadNotification(id);
  }

  @Patch(':id/cancel')
  async cancelNotification(@Param('id') id: string): Promise<Notification> {
    return this.notificationsService.cancelNotification(id);
  }

  @Get('from/recipient/:recipientId')
  async getNotificationsByRecipientId(
    @Param('recipientId') recipientId: string,
  ): Promise<Notification[]> {
    return this.notificationsService.getNotificationsByRecipientId(recipientId);
  }

  @Get('read')
  async getReadNotifications(): Promise<Notification[]> {
    return this.notificationsService.getReadNotifications();
  }

  @Patch('read-all')
  async readAllNotifications(): Promise<Notification[]> {
    return this.notificationsService.readAllNotifications();
  }

  @Patch('cancel-all')
  async cancelAllNotifications(): Promise<Notification[]> {
    return this.notificationsService.cancelAllNotifications();
  }
}
