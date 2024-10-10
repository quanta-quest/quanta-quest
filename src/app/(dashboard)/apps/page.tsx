import React from 'react';

import { type Metadata } from 'next';

import AppsPage from '@/components/apps';

export const metadata: Metadata = {
  title: 'Apps | Quanta Quest'
};

const page = () => {
  return <AppsPage />;
};

export default page;
