import { Notification } from '@application/entities/notification';
import { Content } from '@application/entities/notification-content';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CacncelNotification } from './cancel-notification';
import { NotificationNotFoundError } from './errors/notification-not-found-error';

describe('Cacncel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cacncelNotification = new CacncelNotification(
      notificationsRepository,
    );

    const notification = new Notification({
      category: 'social',
      content: new Content('New friend request'),
      recipientId: 'example-recipient-id',
    });

    await notificationsRepository.create(notification);

    await cacncelNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cacncelNotification = new CacncelNotification(
      notificationsRepository,
    );

    expect(() => {
      return cacncelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
