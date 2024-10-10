'use client';

import React, { Suspense } from 'react';

import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import { trpc } from '../_trpc/client';

const CallbackPage = () => {
  const router = useRouter();

  const searchParameters = useSearchParams();
  const origin = searchParameters.get('origin');

  const { data, error } = trpc.auth.authCallback.useQuery(undefined, {
    retry: true,
    retryDelay: 500
  });
  // console.log(origin);
  if (data?.success) {
    router.push(origin ? `${origin}` : '/dashboard');
  } else {
    if (error?.data?.code === 'UNAUTHORIZED') {
      router.push('/sign-in');
    }
  }

  return (
    <div className='mt-24 w-full justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
        <h3 className='text-xl font-semibold'> Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense>
      <CallbackPage />
    </Suspense>
  );
};

export default Page;
