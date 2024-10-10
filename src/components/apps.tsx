'use client';

import React from 'react';

import { ScrollShadow } from '@nextui-org/react';

import { trpc } from '@/app/_trpc/client';
import AppsCardLoading from '@/components/apps-card-loading';
import AppCard from '@/components/apps-card/apps-card';
import MaxWidthWrapper from '@/components/ui/max-width-warpper';
import { cn } from '@/lib/utils';

const AppsPage = () => {
  const {
    data: connectedApps,
    isLoading: connectedLoading,
    refetch: refetchConnectedApps
  } = trpc.apps.getConnectedApps.useQuery();

  const { data: apps, isLoading: appsLoading } = trpc.apps.getAppSources.useQuery();

  return (
    <MaxWidthWrapper className='flex h-full flex-col gap-6'>
      {/* Title */}
      <div className='flex flex-col gap-1'>
        <div className='flex items-center gap-x-3'>
          <h1 className='text-3xl font-bold leading-9 text-default-foreground'>Apps Management</h1>
        </div>
        <h2 className='mt-2 text-small text-default-500'>
          You can connect apps to your account here.
        </h2>
      </div>
      <ScrollShadow>
        <div className='flex items-center gap-x-3'>
          <h2 className='text-2xl font-bold text-default-foreground'>Apps</h2>
        </div>

        <div
          className={cn(
            'grid max-w-7xl grid-cols-1 gap-5 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          )}
        >
          {apps && apps.length > 0 ? (
            <>
              {/* 最近创建排序 */}
              {apps
                // .filter((app) => app && app.status === 1)
                .map((app) => {
                  const cApp = connectedApps
                    ? connectedApps.find((c) => c.appId === app.id && app.status === 1)
                    : undefined;

                  return (
                    <AppCard
                      key={app.id}
                      app={app}
                      source={cApp}
                      refreshConnectedApps={refetchConnectedApps}
                    />
                  );
                })}
            </>
          ) : (
            appsLoading && (
              // loading
              <>
                <AppsCardLoading />
                <AppsCardLoading />
                <AppsCardLoading />
                <AppsCardLoading />
              </>
            )
          )}
          {/* <AppCard key={'0'} id={0} app={1} connectedAt={0} status={0} remark={''} disabled /> */}
        </div>
      </ScrollShadow>
    </MaxWidthWrapper>
  );
};

export default AppsPage;
