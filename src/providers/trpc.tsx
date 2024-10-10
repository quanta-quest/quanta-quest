'use client';

import React, { PropsWithChildren, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, loggerLink, splitLink, unstable_httpSubscriptionLink } from '@trpc/client';
import { EventSourcePolyfill, EventSourcePolyfillInit } from 'event-source-polyfill';

import { trpc } from '@/app/_trpc/client';
import { getBaseUrl } from '@/lib/utils';

globalThis.EventSource = EventSourcePolyfill as typeof EventSource;

const TRPCProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: (options) =>
            process.env.NODE_ENV === 'development' ||
            (options.direction === 'down' && options.result instanceof Error)
        }),
        splitLink({
          // uses the httpSubscriptionLink for subscriptions
          condition: (op) => op.type === 'subscription',
          true: unstable_httpSubscriptionLink({
            url: `${getBaseUrl()}/api/trpc`,
            eventSourceOptions: async () => {
              return {
                headers: {
                  'X-Accel-Buffering': 'no'
                }
              } as EventSourcePolyfillInit;
            }
          }),
          false: httpBatchLink({
            url: `${getBaseUrl()}/api/trpc`
          })
        })
      ]
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
export default TRPCProvider;
