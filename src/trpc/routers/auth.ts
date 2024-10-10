import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { db } from '@/lib/prisma';

import { publicProcedure, router } from '../trpc';

export const authRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();
    if (!kindeUser?.id || !kindeUser.email) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    // check if the user is in the databse
    const databaseUser = await db.user.findFirst({
      where: {
        kinde_user_id: kindeUser.id
      }
    });

    if (!databaseUser) {
      // create user in db
      //TODO: need to request to server to add user
      await fetch(`${process.env.SERVER_URL}/api/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          kinde_user_id: kindeUser.id,
          email: kindeUser.email,
          image: kindeUser.picture ?? '',
          given_name: kindeUser.given_name ?? '',
          family_name: kindeUser.family_name ?? ''
        })
      });
    }

    return { success: true };
  })
});
