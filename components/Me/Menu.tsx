'use client';

import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import HeadlessTippy from '@tippyjs/react/headless';
import { readAllNotifications } from '@/actions/notifications';
import { MENU } from '@/data/ellipsis-notification';

interface MenuProps {
  children: React.ReactNode;
  classname?: string;
}

function Menu({ children, classname }: MenuProps) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const markAll = () => {
    readAllNotifications();
    toast.success('Mark all as read');
    router.refresh();
  };

  const renderMenu = () => {
    return (
      <div className="bg-slate-100 w-[300px] rounded-lg px-2 py-3">
        {MENU.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-row items-center gap-3 p-1 rounded-md hover:bg-white cursor-pointer"
              onClick={() => {
                setVisible(false);
                if (item.title === 'Mark all as read') {
                  markAll();
                }
              }}
            >
              <item.icon size={17} />
              {item.title}
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <HeadlessTippy
      // trigger="click"
      visible={visible}
      interactive={true}
      placement="bottom-end"
      render={renderMenu}
      className={classname}
    >
      <button onClick={() => setVisible(!visible)}>{children}</button>
    </HeadlessTippy>
  );
}

export default Menu;
