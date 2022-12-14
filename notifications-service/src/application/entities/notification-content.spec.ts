import { Content } from './notification-content';

describe('Notification Content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('You received a new friend request');
    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification content with less than 5 characters', () => {
    const content = () => new Content('You');
    expect(content).toThrow();
  });

  it('should not be able to create a notification content with more than 240 characters', () => {
    const content = () => new Content('You'.repeat(240));
    expect(content).toThrow();
  });
});
