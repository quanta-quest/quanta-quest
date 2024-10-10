import { db } from '@/lib/prisma';

export async function getConnectedApps(userId: number) {
  return await db.user_app_source.findMany({
    where: {
      user_id: userId
    }
  });
}
