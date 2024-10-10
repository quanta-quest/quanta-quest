'use client';

import React from 'react';

import { LoginLink } from '@kinde-oss/kinde-auth-nextjs';
import { Button } from '@nextui-org/react';
import Image from 'next/image';

import backgroundImage from '@/images/background-call-to-action.jpg';

import { Container } from '../container';

export function CallToAction() {
  return (
    <section id='get-started-today' className='relative overflow-hidden bg-blue-600 py-32'>
      <Image
        className='absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2'
        src={backgroundImage}
        alt=''
        width={2347}
        height={1244}
        unoptimized
      />
      <Container className='relative'>
        <div className='mx-auto max-w-lg text-center'>
          <h2 className='font-display text-3xl tracking-tight text-white sm:text-4xl'>
            Get started today
          </h2>
          <p className='mt-4 text-lg tracking-tight text-white'>
            Unlock the full potential of your personal data with AI-powered search and organization.
          </p>
          <LoginLink>
            <Button color='secondary' className='mt-10 dark:bg-white dark:text-primary'>
              Begin 14-Day Free Trial
            </Button>
          </LoginLink>
        </div>
      </Container>
    </section>
  );
}
