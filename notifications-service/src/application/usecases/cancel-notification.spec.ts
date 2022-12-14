import { Notification } from '@application/entities/notification';
import { Content } from '@application/entities/notification-content';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CacncelNotification } from './cancel-notification';
import { NotificationNotFoundError } from './errors/notification-not-found-error';

describe('Cacncel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cacncelNotification = new CacncelNotification(
      notificationsRepository,
    );

    const notification = makeNotification();

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

    const operation = () => {
      return cacncelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    };

    expect(operation).rejects.toThrow(NotificationNotFoundError);
  });
});
