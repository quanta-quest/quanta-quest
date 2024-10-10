'use client';

import React from 'react';

import type { ReactNode } from 'react';

import { Popover, PopoverBackdrop, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { type KindeUserBase } from '@kinde-oss/kinde-auth-nextjs/types';
import { Button, Image } from '@nextui-org/react';
import clsx from 'clsx';
import Link from 'next/link';

import { Container } from '@/components/container';
import { NavLink } from '@/components/home/nav-link';

import ThemeToggle from '../theme-toggle';

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <PopoverButton as={Link} href={href} className='block w-full p-2'>
      {children}
    </PopoverButton>
  );
}

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden='true'
      className='h-3.5 w-3.5 overflow-visible stroke-slate-700'
      fill='none'
      strokeWidth={2}
      strokeLinecap='round'
    >
      <path
        d='M0 1H14M0 7H14M0 13H14'
        className={clsx('origin-center transition', open && 'scale-90 opacity-0')}
      />
      <path
        d='M2 2L12 12M12 2L2 12'
        className={clsx('origin-center transition', !open && 'scale-90 opacity-0')}
      />
    </svg>
  );
}

function MobileNavigation() {
  const { user } = useKindeBrowserClient();
  return (
    <Popover>
      <PopoverButton
        className='ui-not-focus-visible:outline-none relative z-10 flex h-8 w-8 items-center justify-center'
        aria-label='Toggle Navigation'
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </PopoverButton>
      <PopoverBackdrop
        transition
        className='fixed inset-0 bg-slate-300/50 duration-150 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in'
      />
      <PopoverPanel
        transition
        className='absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5 data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-150 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in'
      >
        <MobileNavLink href='#features'>Features</MobileNavLink>
        <MobileNavLink href='#testimonials'>Testimonials</MobileNavLink>
        <MobileNavLink href='/privacy'>Privacy policy</MobileNavLink>
        <MobileNavLink href='/aboutus'>About us</MobileNavLink>

        {user ? (
          <></>
        ) : (
          <>
            <hr className='m-2 border-slate-300/40' />
            <LoginLink>Sign in</LoginLink>
          </>
        )}
      </PopoverPanel>
    </Popover>
  );
}

export function Header() {
  const { user } = useKindeBrowserClient();
  return (
    <header className='py-10'>
      <Container>
        <nav className='relative z-50 flex justify-between'>
          <div className='flex items-center md:gap-x-12'>
            <Link href='/' aria-label='Home' className='flex items-center'>
              {/* <Logo className='h-10 w-auto' /> */}
              {/* <Image src='' className='h-10 w-auto' height={10} /> */}
              <span className='text-xl font-bold'>Quanta Quest</span>
            </Link>
            <div className='hidden md:flex md:gap-x-6'>
              <NavLink href='/#features'>Features</NavLink>
              {/* <NavLink href='/#testimonials'>Testimonials</NavLink> */}
              <NavLink href='/#pricing'>Pricing</NavLink>
              <NavLink href='/privacy'>Privacy policy</NavLink>
              <NavLink href='/aboutus'>About us</NavLink>
            </div>
          </div>
          <div className='flex items-center gap-x-5 md:gap-x-8'>
            <div className='hidden md:block'>
              {user ? <></> : <LoginLink>Sign in</LoginLink>}
              {/* <NavLink href='/login'>Sign in</NavLink> */}

              {/* <LoginLink>Sign in</LoginLink> */}
            </div>

            {user ? (
              <Button as={Link} color='primary' href='/dashboard' className='dark:text-foreground'>
                Dashboard
              </Button>
            ) : (
              <Button color='primary' className='dark:text-foreground'>
                <RegisterLink>
                  <span>
                    Get started <span className='hidden lg:inline'>today</span>
                  </span>
                </RegisterLink>
              </Button>
            )}

            <ThemeToggle />

            <div className='-mr-1 md:hidden'>
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}
