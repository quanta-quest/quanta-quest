import { createTRPCReact } from '@trpc/react-query';

import { AppRouter } from '@/trpc/routers/_app';

export const trpc = createTRPCReact<AppRouter>({});
