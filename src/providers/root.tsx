import React from 'react';

import type { PropsWithChildren } from 'react';

import NextUiProvider from './next-ui';
import ThemeProvider from './theme';
import TRPCProvider from './trpc';

type TRootProvider = PropsWithChildren;

export default async function RootProvider({ children }: TRootProvider) {
  return (
    <NextUiProvider>
      <ThemeProvider>
        <TRPCProvider>{children}</TRPCProvider>
      </ThemeProvider>
    </NextUiProvider>
  );
}
