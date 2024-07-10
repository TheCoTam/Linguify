'use server';

import { redirect } from 'next/navigation';

import { Card, CardContent } from '@/components/ui/card';
import { getNotifications } from '@/data/notifications';
import Item from '@/components/Me/NotificationItem';
import Header from '@/components/Me/NotificationHeader';

async function NotificationPage() {
  const notifications = await getNotifications();
  if (!notifications) return redirect('/');

  return (
    <Card className="w-[650px] shadow-md">
      <Header />
      <CardContent>
        {notifications.length === 0 ? (
          <div className="flex justify-center items-center min-h-[300px]">
            You dont have any notifications!
          </div>
        ) : (
          notifications.map((notification) => {
            return <Item key={notification.id} data={notification} />;
          })
        )}
      </CardContent>
    </Card>
  );
}

export default NotificationPage;
