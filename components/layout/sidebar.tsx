'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import {
  TEACHER_ROUTES,
  STUDENT_ROUTES,
} from '@/data/sidebar-navigation';

function Sidebar() {
  const pathname = usePathname();
  const isTeacherPage = pathname?.includes('/teacher');
  const routes = isTeacherPage ? TEACHER_ROUTES : STUDENT_ROUTES;

  return (
    <div className="hidden lg:block w-24 bg-slate-100 text-xs">
      <div className="sticky top-[75px] left-0 z-10 gap-3 flex flex-col w-24 items-center font-semibold my-2">
        {routes.map((data, index) => {
          if (data.href) {
            const isActive = pathname === data.href;

            return (
              <Link
                key={index}
                href={data.href}
                className={`flex flex-col justify-center items-center gap-1 rounded-[15px] w-[70px] h-[70px] hover:bg-slate-200 ${
                  isActive ? 'bg-slate-300' : ''
                }`}
              >
                {data.topIcon && (
                  <div>
                    <Image
                      src={data.topIcon}
                      width={25}
                      height={25}
                      alt={data.title}
                    />
                  </div>
                )}
                <div className="px-1">{data.title}</div>
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Sidebar;
