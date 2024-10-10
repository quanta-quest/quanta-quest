import { type user as User } from '@prisma/client';

export const check_user_status = ({ user }: { user: User }) => {
  // check for user status
  if (user.status === 1) {
    // active is ok to continue
  } else if (user.status === 0 && user.trial_end_at) {
    // trialing
    const trialEndAt = user.trial_end_at;
    if (trialEndAt > new Date()) {
      // still in trial is ok to continue
    }
  } else {
    // subscription
    return false;
  }

  return true;
};
