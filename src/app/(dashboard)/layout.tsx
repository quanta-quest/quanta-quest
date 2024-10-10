import React from 'react';

import { type Metadata } from 'next';

import SidebarNav from '@/components/dashboard/sidebar-nav';

export const metadata: Metadata = {
  robots: 'noindex, nofollow'
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-dvh'>
      <SidebarNav />
      <div className='flex-1 flex-col'>{children}</div>
    </div>
  );
}
