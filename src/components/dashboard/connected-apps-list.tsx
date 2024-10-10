'use client';

import React from 'react';

import { Button, Link } from '@nextui-org/react';
import { Plus } from 'lucide-react';

import { useAppStore } from '@/store/app-store';

import AppLogo from '../logo/app-logo';

const ConnectedAppList = () => {
  const { apps, connectedApps } = useAppStore();

  return (
    <div className='flex w-full items-center justify-start'>
      {connectedApps &&
        apps &&
        connectedApps.map((connectedApp) => {
          const key = apps.find((a) => a.id === connectedApp.appId)?.key;
          return (
            key && (
              <Button key={key} className='' size='md' variant='light'>
                {/* <Badge
              variant='flat'
              content={
                connectedApp.syncStatus === 0 ? (
                  <Loader size={12} />
                ) : connectedApp.syncStatus === 1 ? (
                  <RefreshCcw size={12} />
                ) : connectedApp.syncStatus === 2 ? (
                  <Check size={12} />
                ) : (
                  <CircleAlert size={12} />
                )
              }
              color={
                connectedApp.syncStatus === 0
                  ? 'default'
                  : connectedApp.syncStatus === 1
                    ? 'primary'
                    : connectedApp.syncStatus === 2
                      ? 'success'
                      : 'danger'
              }
              size='lg'
              placement='bottom-right'
            > */}
                <AppLogo app={key} size={24} />
                {/* </Badge> */}
                {/* <Image radius='none' src={icon} sizes='sm' className='w-6' /> */}
              </Button>
            )
          );
        })}

      <Button as={Link} key='add' size='sm' variant='light' href='/apps'>
        <Plus />
      </Button>
    </div>
  );
};

export default ConnectedAppList;
