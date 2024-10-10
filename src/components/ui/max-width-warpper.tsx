import React from 'react';

import { cn } from '@/lib/utils';

//在宽屏下，保证左右两边距离一致
const MaxWidthWrapper = ({
  className,
  children
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn('mx-auto w-full max-w-screen-2xl px-2.5 py-4 md:px-20', className)}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
