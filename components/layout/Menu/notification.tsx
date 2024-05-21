import Image from 'next/image';

import Header from './header';
import { useRouter } from 'next/navigation';

interface IProps {
  title: string | null;
  btnTitle: string | null;
  items: Array<any>;
  href?: string;
}

function Notification(props: IProps) {
  const { title, btnTitle, items, href } = props;
  const router = useRouter();

  return (
    <div className="flex flex-col gap-1 bg-white  rounded-lg  overflow-hidden w-[380px] max-h-[70vw] pb-2">
      <Header title={title} btnTitle={btnTitle} href={href} />
      <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto">
        {items.map((item, index) => {
          return (
            <div
              className="flex flex-row mx-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-100"
              key={index}
            >
              <div className="w-11 h-11 rounded-full overflow-hidden">
                <Image
                  src={item.image}
                  width={40}
                  height={40}
                  alt="logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col px-2">
                <div>{item.content}</div>
                <div className="text-xs text-red-400 font-semibold mt-2">
                  {item.createdTime}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className="flex justify-center items-center w-full h-11 -mb-2 border-t-[1px] border-slate-300 hover:bg-slate-200 active:bg-slate-300 text-xs text-red-500 font-semibold cursor-pointer"
        onClick={() => router.push('/me/notification')}
      >
        See all notification
      </div>
    </div>
  );
}

export default Notification;
