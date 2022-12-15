import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';
import { Content } from '@application/entities/notification-content';

type Overide = Partial<NotificationProps>;

export function makeNotification(override: Overide = {}) {
  return new Notification({
    category: 'social',
    content: new Content('New friend request'),
    recipientId: 'recipient-1',
    ...override,
  });
}
