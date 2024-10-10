'use client';

import React from 'react';

import { trpc } from '@/app/_trpc/client';

const HelloComponent = () => {
  const { data, isLoading, error } = trpc.hello.useQuery(
    { text: '你好' },
    {
      retry: false,
      retryDelay: 500
    }
  );

  return <h1>{data?.greeting ?? '-'}</h1>;
};

export default HelloComponent;
