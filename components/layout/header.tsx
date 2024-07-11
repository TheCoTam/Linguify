'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Fragment, Suspense } from 'react';
import { logout } from '@/actions/sign-out';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

import { SearchInput } from './search-input';
import Menu from './Menu/menu';
import HeaderModal from '@/components/layout/Modal/headerModal';
import GoBackButton from '../GoBackButton';
import { useCurrentUser } from '@/hooks/use-current-user';
import { USER_MENU } from '@/data/header-navigation';

function Header() {
  const currentUser = useCurrentUser();

  const pathName = usePathname();
  const isHomePage = pathName === '/';
  const isNotificationPage = pathName === '/notifications';
  const isSearchPage = pathName === '/search';

  const isTeacherPage = pathName?.startsWith('/teacher');
  const isStudentPage = pathName?.startsWith('/courses');

  const [headerModal, setHeaderModal] = useState(false);

  const openHeaderModal = () => setHeaderModal(true);
  const closeHeaderModal = () => setHeaderModal(false);

  return (
    <div className="flex flex-row w-full h-[66px] mx-0 px-1 md:px-7 justify-between items-center z-20 sticky top-0 left-0 bg-slate-100 border-b-[1px]">
      <div className="flex flex-row items-center lg:gap-3 mr-2 lg:mr-0">
        <button className="lg:hidden" onClick={openHeaderModal}>
          <Image
            src="/icons/menuIcon.svg"
            width={30}
            height={30}
            alt="menuIcon"
          />
        </button>
        {headerModal && <HeaderModal closeModal={closeHeaderModal} />}
        <div className='flex justify-center items-center overflow-hidden max-h-[60px] rounded-xl'>
          <Link href="/">
            <Image
              src="/images/original.png"
              width={180}
              height={64}
              alt="logo"
            />
          </Link>
        </div>
        {!isHomePage && <GoBackButton />}
      </div>

      <div className="hidden md:block">
        {isSearchPage && (
          <Suspense>
            <SearchInput />
          </Suspense>
        )}
      </div>

      <div className="flex flex-row items-center justify-end gap-2 ml-auto lg:ml-0">
        <Fragment>
          {isTeacherPage || isStudentPage ? (
            <Link href="/">
              <Button size="sm" variant="outline">
                Student mode
              </Button>
            </Link>
          ) : (
            <Link href="/teacher/courses">
              <Button size="sm" variant="outline">
                Teacher mode
              </Button>
            </Link>
          )}

          {/* Notification btn  */}
          {isNotificationPage ? (
            <Image
              src="/icons/activeBellIcon.svg"
              alt=""
              width={30}
              height={30}
            />
          ) : (
            <Link href="/notifications">
              <Image
                src="/icons/bellIcon.svg"
                width={30}
                height={30}
                alt="bellIcon"
              />
            </Link>
          )}

          {/* User avatar */}
          <Menu
            title={null}
            btnTitle={null}
            type="avatar"
            items={USER_MENU}
          >
            <div>
              <Image
                className="hidden lg:block lg:cursor-pointer lg:rounded-full lg:object-cover ml-2 lg:w-[30px] lg:h-[30px]"
                src={
                  currentUser?.image
                    ? currentUser.image
                    : '/images/no-avatar.png'
                }
                width={30}
                height={30}
                alt="User avatar"
              />
            </div>
          </Menu>
        </Fragment>
      </div>
    </div>
  );
}

export default Header;
