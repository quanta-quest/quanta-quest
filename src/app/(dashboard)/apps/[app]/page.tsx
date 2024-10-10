import React from 'react';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { ScrollShadow } from '@nextui-org/react';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

import AppDetailCard from '@/components/app-documents/app-detail-card';
import AppDocumentTable from '@/components/app-documents/document-table';
import MaxWidthWrapper from '@/components/ui/max-width-warpper';
import { getAppInfos } from '@/lib/constants/app-constants';
import { db } from '@/lib/prisma';

const Page = async ({ params }: { params: { app: string } }) => {
  const { app } = params;
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  const user = await db.user.findFirst({
    where: {
      kinde_user_id: kindeUser.id
    }
  });

  if (!user) {
    redirect('/auth-callback?origin=/dashboard');
  }

  const app_source = getAppInfos().find((item) => item.key === app);

  if (!app_source) {
    // toast.error('Not found app');
    redirect('/apps');
  }

  const user_app_source = await db.user_app_source.findFirst({
    where: {
      app_id: app_source.id,
      user_id: user.id
    }
  });

  if (!user_app_source) {
    // toast.error('You are not connected to this app');
    redirect('/apps');
  }

  return (
    <>
      <ScrollShadow orientation='vertical' className='h-full w-full'>
        <MaxWidthWrapper className='mt-4 flex h-full flex-col gap-6'>
          {/* header */}
          <h1 className='text-start text-4xl font-extrabold'>Management</h1>
          <AppDetailCard appInfo={app_source} userAppSource={user_app_source} />
          <div>
            <AppDocumentTable appId={app_source.id} />
          </div>
        </MaxWidthWrapper>
      </ScrollShadow>
    </>
  );
};

export default Page;
