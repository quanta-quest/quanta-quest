import React from 'react';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { ScrollShadow } from '@nextui-org/react';
import { type Metadata } from 'next';
import { redirect } from 'next/navigation';

import Dashboard from '@/components/dashboard/dashboard';
import MaxWidthWrapper from '@/components/ui/max-width-warpper';
import { db } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Dashboard | Quanta Quest'
};

const page = async () => {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  if (!kindeUser?.id) {
    redirect('/auth-callback?origin=/dashboard');
  }

  // console.log(kindeUser);

  const databaseUser = await db.user.findFirst({
    where: {
      kinde_user_id: kindeUser.id
    }
  });

  if (!databaseUser) {
    redirect('/auth-callback?origin=/dashboard');
  }

  // console.log(dbUser);

  //TODO: jump to onboard

  return (
    <>
      <ScrollShadow
        className='flex h-full w-full flex-col items-start justify-start px-4'
        orientation='vertical'
      >
        <MaxWidthWrapper>
          <Dashboard />
        </MaxWidthWrapper>
      </ScrollShadow>
    </>
  );
};

export default page;
