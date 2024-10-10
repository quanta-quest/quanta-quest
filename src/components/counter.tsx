'use client';

import React, { useState } from 'react';

import { Button } from '@nextui-org/button';

import { Card, CardContent, CardHeader } from './ui/card';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <Card className='w-72 border border-border bg-secondary shadow-md'>
      <CardHeader>
        <h1 className='text-2xl'>Next TypeScript</h1>
        <h2 className='text-lg'>with shadcn/ui</h2>
      </CardHeader>
      <CardContent className='flex w-full items-center justify-between'>
        <Button
          color='primary'
          className='rounded-full'
          data-testid='increase-count'
          isIconOnly
          onClick={() => setCount((previousCount) => previousCount + 1)}
        >
          + 1
        </Button>

        <h2 className='text-6xl' data-testid='count'>
          {count}
        </h2>

        <Button
          color='primary'
          className='rounded-full'
          data-testid='decrease-count'
          isIconOnly
          onClick={() => setCount((previousCount) => previousCount - 1)}
        >
          - 1
        </Button>
      </CardContent>
    </Card>
  );
}
