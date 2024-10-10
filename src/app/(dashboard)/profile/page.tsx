import React, { Suspense } from 'react';

import { type Metadata } from 'next';

import ProfilePage from '@/components/profile/profile';

export const metadata: Metadata = {
  title: 'Profile | Quanta Quest'
};

const Page = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ProfilePage />
      </Suspense>
    </>
  );
};

export default Page;
