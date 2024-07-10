import Image from 'next/image';
import Link from 'next/link';
import { useCurrentUser } from '@/hooks/use-current-user';

interface IProps {
  items: Array<any>;
}

function Avatar(props: IProps) {
  const { items } = props;

  const currentUser = useCurrentUser();

  return (
    <div className="flex flex-col gap-1 bg-white  rounded-lg  overflow-hidden w-[230px]">
      <div className="px-6 py-2">
        <div className="flex flex-row">
          <div className="flex justify-center items-center w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={
                currentUser?.image
                  ? currentUser.image
                  : '/images/no-avatar.png'
              }
              width={60}
              height={80}
              alt={currentUser?.name ? currentUser.name : 'Anonymous'}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex justify-center items-center ml-3 font-semibold">
            {currentUser?.name}
          </div>
        </div>
        <hr className="my-2" />
        {items.map((item, index) => (
          <div key={index} className="flex flex-col">
            {item.href ? (
              <Link
                href={item.href}
                className="px-2 py-[10px] rounded-xl hover:font-semibold hover:bg-slate-50 active:bg-slate-100 text-sm text-gray-600  cursor-pointer"
              >
                {item.title}
              </Link>
            ) : item.onClick ? (
              <div className="px-2 py-[10px] rounded-xl hover:font-semibold active:bg-slate-100 text-sm text-gray-600  cursor-pointer">
                <button onClick={item.onClick}>{item.title}</button>
              </div>
            ) : (
              <div className="px-2 py-[10px] rounded-xl hover:font-semibold active:bg-slate-100 text-sm text-gray-600  cursor-pointer">
                {item.title}
              </div>
            )}
            {item.hrTag && <hr className="my-2" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Avatar;
