import { currentUserId } from '@/lib/auth';
import { db } from '@/lib/db';

export const getNotifications = async () => {
  try {
    const userId = await currentUserId();
    const notifications = await db.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return notifications;
  } catch (error) {
    console.log('[actions/notifications]', error);
    return null;
  }
};
