import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

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
        <div className="flex justify-center items-center w-[100%] min-h-body-height bg-slate-100">
          {children}
        </div>

        <Footer />
      </div>
    </SessionProvider>
  );
}
