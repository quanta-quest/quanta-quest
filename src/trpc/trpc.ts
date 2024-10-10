import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';

import { db } from '@/lib/prisma';

// const t = initTRPC.create({
//   transformer: superjson
// });

const t = initTRPC.create();

const middleware = t.middleware;

const isAuth = middleware(async (options) => {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  // console.log("auth middleware");
  if (!kindeUser?.id || !kindeUser.email) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  const user = await db.user.findFirst({
    where: {
      kinde_user_id: kindeUser.id
    }
  });

  if (!user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User not found'
    });
  }

  return options.next({
    ctx: {
      userId: user.id,
      user: user,
      kUserId: kindeUser.id,
      kindeUser
    }
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
