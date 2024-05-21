'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  TEACHER_MENU,
  STUDENT_MENU,
} from '@/data/header-modal-navigation';
import { usePathname } from 'next/navigation';
import { useCurrentUser } from '@/hooks/use-current-user';

interface IProps {
  closeModal: () => void;
}

function HeaderModal({ closeModal }: IProps) {
  const pathname = usePathname();
  const currentUser = useCurrentUser();

  const isTeacherPage = pathname?.includes('/teacher');
  const MENU = isTeacherPage ? TEACHER_MENU : STUDENT_MENU;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 animate-fadeIn"
      onClick={closeModal}
    >
      <div
        className="flex flex-col w-[80%] md:w-[70%] h-full px-7 py-4 bg-white animate-floatLeftToRight overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {currentUser && (
          <div className="flex flex-col gap-3 pl-5 mt-14 shrink-0">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <Image
                src={currentUser.image || '/images/no-avatar.png'}
                alt=""
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="font-semibold text-lg">
              {currentUser.name}
            </div>
          </div>
        )}
        {currentUser && <hr className="my-4" />}
        <div className="flex flex-col">
          {MENU.map((item, index) => (
            <div key={index}>
              {item.onClick ? (
                <button
                  className="flex flex-row items-center gap-5 py-6 pl-5 rounded-lg hover:bg-slate-200 active:bg-slate-300 cursor-pointer font-semibold text-gray-600"
                  onClick={item.onClick}
                >
                  <Image
                    src={item.icon || '/images/no-image.png'}
                    alt=""
                    width={24}
                    height={24}
                    className="w-auto h-auto"
                  />
                  {item.title}
                </button>
              ) : (
                item.visible && (
                  <Link
                    href={item.href || '/'}
                    className="flex flex-row items-center gap-5 py-6 pl-5 rounded-lg hover:bg-slate-200 active:bg-slate-300 cursor-pointer font-semibold text-gray-600"
                    onClick={closeModal}
                  >
                    <Image
                      src={item.icon || '/images/no-image.png'}
                      alt=""
                      width={24}
                      height={24}
                    />
                    {item.title}
                  </Link>
                )
              )}

              {item.hrTag && item.visible && <hr className="my-4" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeaderModal;
