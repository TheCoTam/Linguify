'use server';

import { db } from '../lib/db';
import { currentUserId } from '@/lib/auth';

export const readAllNotifications = async () => {
  try {
    const userId = await currentUserId();
    await db.notification.updateMany({
      where: { userId },
      data: { isRead: true },
    });
    return { success: 'Mark all notifications successfully!' };
  } catch (error) {
    console.log('[actions/notifications]', error);
    return { error: 'Something went wrong!' };
  }
};

export const readNotification = async (id: string) => {
  try {
    const notification = await db.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      return { error: 'Something went wrong!' };
    }

    if (notification.isRead === false) {
      await db.notification.update({
        where: { id },
        data: { isRead: true },
      });
      return { success: 'Mark as read' };
    }
    return null;
  } catch (error) {
    console.log('[actions/notifications]', error);
    return { error: 'Something went wrong!' };
  }
};
