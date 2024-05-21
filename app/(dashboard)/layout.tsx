import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Sidebar from '@/components/layout/sidebar';

import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="flex flex-col w-[100%]">
        <Header />
        <div className="flex flex-row w-[100%] min-h-body-height bg-slate-100">
          <Sidebar />
          <div className="flex-1 min-w-0">{children}</div>
        </div>

        <Footer />
      </div>
    </SessionProvider>
  );
}
