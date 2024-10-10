import { privateProcedure, router } from '../trpc';

export const userRouter = router({
  getUserInfo: privateProcedure.query(async ({ ctx }) => {
    const { user } = ctx;

    return user;
  })
});
