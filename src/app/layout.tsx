import '../styles/globals.css';
import '../styles/globals.scss';

import React from 'react';

import type { Metadata, Viewport } from 'next';

import config from '_config';
import { Toaster } from 'sonner';

import RootProvider from '@/providers/root';

export const metadata: Metadata = {
  title: config.metadata.title,
  description: config.metadata.description,
  keywords: config.metadata.keywords,
  icons: '/logo.png',
  manifest: 'app.webmanifest'
};

export const viewport: Viewport = {
  themeColor: '#000'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='text-foreground'>
        <RootProvider>
          {/* <Navbar /> */}

          {children}

          <Toaster position='top-center' richColors closeButton />

          {/* <Footer /> */}
        </RootProvider>
      </body>
    </html>
  );
}
