'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { calculateTime } from '@/lib/utils';
import { readNotification } from '@/actions/notifications';
import toast from 'react-hot-toast';

interface props {
  data: any;
}

function Item({ data }: props) {
  const router = useRouter();

  const handleClick = () => {
    readNotification(data.id).then((res) => {
      if (res?.success) toast.success(res.success);
      if (res?.error) toast.error(res.error);
      if (data.href) {
        router.push(data.href);
      } else {
        router.refresh();
      }
    });
  };

  const itemImage = data.image ? data.image : '/images/no-image.png';

  return (
    <div
      className="flex flex-row items-center gap-4 px-3 py-2 hover:bg-green-100 cursor-pointer rounded-xl"
      onClick={handleClick}
    >
      <div className="flex items-center justify-center w-[50px] h-[50px] rounded-full overflow-hidden shrink-0">
        <Image
          src={itemImage}
          alt=""
          width={43}
          height={43}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col overflow-hidden max-w-[450px]">
        <div className="max-h-[48px] line-clamp-2">
          {data.message}
        </div>
        {data.updatedAt && (
          <div className="mt-2 text-orange-400 text-xs">
            {`${calculateTime(data.updatedAt)}`}
          </div>
        )}
      </div>
      {!data.isRead && (
        <div className="ml-auto w-2 h-2 rounded-full bg-blue-300 shrink-0"></div>
      )}
    </div>
  );
}

export default Item;
