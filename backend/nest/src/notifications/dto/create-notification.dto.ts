export class CreateNotificationDto {
  recipientId: string;
  content: string;
  category: string;
  action?: number;
  readAt?: Date;
  canceledAt?: Date;
}
