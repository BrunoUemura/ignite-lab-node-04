import { Injectable } from '@nestjs/common';

import { NotificationsRepository } from '../repositories/notifications-repository';
import { NotificationNotFoundError } from './errors/notification-not-found-error';

interface CacncelNotificationRequest {
  notificationId: string;
}

type CacncelNotificationResponse = void;

@Injectable()
export class CacncelNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CacncelNotificationRequest,
  ): Promise<CacncelNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
