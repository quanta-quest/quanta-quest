'use client';

import React from 'react';

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { Button, ScrollShadow, Spacer, Tooltip } from '@nextui-org/react';
import { CircleMinus, Info, LogOut } from 'lucide-react';
import Link from 'next/link';

import Sidebar from '@/components/dashboard/sidebar';
import { sectionItems } from '@/components/dashboard/sidebard-items';
import ThemeToggle from '@/components/theme-toggle';
import UserAvater from '@/components/user-avatar';

const SidebarNav = () => {
  const { user } = useKindeBrowserClient();
  return (
    <div className='relative flex h-full w-16 flex-col items-center border-r-small border-divider px-2 py-8'>
      <div className='flex h-8 w-8 items-center justify-center rounded-full'>
        {/* <AcmeIcon className="text-background" /> */}
        <span className='text-lg font-black'>Quanta Quest</span>
      </div>

      <Spacer y={8} />

      <ScrollShadow className='-mr-2 h-full max-h-full py-6 pr-2'>
        <div className='flex flex-col items-center gap-4'>
          <Tooltip
            content={user ? `${user.given_name} ${user.family_name}` : 'loading user'}
            placement='right'
          >
            <Button
              isIconOnly
              className='data-[hover=true]:text-foreground'
              variant='light'
              as={Link}
              href='/profile'
            >
              <UserAvater
                firstName={user?.given_name ?? ''}
                lastName={user?.family_name ?? ''}
                imageUrl={user?.picture ?? ''}
              />
            </Button>
          </Tooltip>
          {/* <Tooltip content="Search" placement="right">
              <Button isIconOnly aria-label="search" className="my-2" radius="lg" variant="light">
                <Icon className="text-default-500" icon="solar:magnifer-linear" width={20} />
              </Button>
            </Tooltip> */}
        </div>

        <Sidebar isCompact defaultSelectedKey='' items={sectionItems} />

        <Spacer y={8} />

        <div className='mt-auto flex flex-col items-center'>
          <Tooltip content='Log Out' placement='right'>
            <LogoutLink>
              <Button isIconOnly className='data-[hover=true]:text-foreground' variant='light'>
                <LogOut width={24} />
              </Button>
            </LogoutLink>
          </Tooltip>

          <ThemeToggle />
        </div>
      </ScrollShadow>
    </div>
  );
};

export default SidebarNav;
