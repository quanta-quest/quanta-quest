import React from 'react';

import { Button } from '@nextui-org/react';
import Link from 'next/link';

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href}>
      <Button variant='light'>{children}</Button>
    </Link>
  );
}
