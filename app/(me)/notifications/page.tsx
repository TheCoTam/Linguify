import { redirect } from 'next/navigation';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getNotifications } from '@/data/notifications';
import { Car } from 'lucide-react';

async function NotificationPage() {
  const notifications = await getNotifications();
  if (!notifications) return redirect('/');

  return (
    <Card className="w-[650px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          Notifications
        </p>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <div className="flex justify-center items-center min-h-[300px]">
            You dont have any notifications!
          </div>
        ) : (
          notifications.map((notification) => {
            return (
              <div key={notification.id}> this is a notification</div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}

export default NotificationPage;
