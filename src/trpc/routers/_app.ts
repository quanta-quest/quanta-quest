import { observable } from '@trpc/server/observable';
import { z } from 'zod';

import { privateProcedure, publicProcedure, router } from '../trpc';
import { appsRouter } from './apps';
import { authRouter } from './auth';
import { documentsRouter } from './documents';
import { knowledgeRouter } from './knowledge';
import { stripeRouter } from './stripe';
import { userRouter } from './user';

export const appRouter = router({
  auth: authRouter,
  apps: appsRouter,
  documents: documentsRouter,
  knowladge: knowledgeRouter,
  stripe: stripeRouter,
  user: userRouter,
  randomNumber: publicProcedure.subscription(() => {
    return observable<number>((emit) => {
      const int = setInterval(() => {
        emit.next(Math.random());
      }, 500);
      return () => {
        clearInterval(int);
      };
    });
  }),
  hello: publicProcedure
    .input(
      z.object({
        text: z.string()
      })
    )
    .query((options) => {
      return {
        greeting: `hello ${options.input.text}`
      };
    })
});
// export type definition of API
export type AppRouter = typeof appRouter;
