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
    await db.notification.update({
      where: { id },
      data: { isRead: true },
    });
    return { success: 'Mark notification as read successfully!' };
    // return null;
  } catch (error) {
    console.log('[actions/notifications]', error);
    return { error: 'Something went wrong!' };
  }
};
