import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { getAppInfos } from '@/lib/constants/app-constants';
import { db } from '@/lib/prisma';
import { type AppDataSource, type UserAppDataSource } from '@/schemas/apps-schemes';
import { type ServerBaseResponse } from '@/schemas/server-reponse';
import { check_user_status } from '@/service/users';

import { privateProcedure, router } from '../trpc';

interface OauthRequestUrlResponse {
  request_url: string;
  // 你可以根据实际返回的数据添加更多字段
}

export const appsRouter = router({
  getAppSources: privateProcedure.query(async () => {
    return getAppInfos();
  }),
  oauthCallback: privateProcedure
    .input(
      z.object({
        code: z.string(),
        app: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      const { app, code } = input;

      if (!check_user_status({ user })) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'need_subscribe' });
      }

      //发送请求给fastapi
      const response = await fetch(`${process.env.SERVER_URL}/api/apps/connect/${app}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: code,
          user_id: user.id
        })
      });

      return await response.json();
    }),
  getAppOauthRequestUrl: privateProcedure
    .input(
      z.object({
        app: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { app } = input;
      const { user } = ctx;

      if (!check_user_status({ user })) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'need_subscribe' });
      }

      //发送请求给fastapi
      const response = await fetch(`${process.env.SERVER_URL}/api/apps/oauth/request/url/${app}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = (await response.json()) as ServerBaseResponse<OauthRequestUrlResponse>;

      return data.code === 0 && data.data ? data.data.request_url : '';
    }),

  getConnectedApps: privateProcedure.query(async ({ ctx }) => {
    const { user } = ctx;

    const apps = await db.user_app_source.findMany({
      where: {
        user_id: user.id
      }
    });

    // eslint-disable-next-line unicorn/prefer-ternary
    if (apps && apps.length > 0) {
      return apps.map((app) => {
        return {
          id: app.id,
          user_id: app.user_id,
          appId: app.app_id,
          connectedAt: app.connected_at ? new Date(app.connected_at).getTime() : 0,
          status: app.status,
          remark: app.remark,
          syncStatus: app.sync_status,
          lastSyncAt: app.last_sync_at ? new Date(app.last_sync_at).getTime() : 0
        } as UserAppDataSource;
      });
    } else {
      return [];
    }
  }),
  importDocsData: privateProcedure
    .input(
      z.object({
        app: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      const { app } = input;

      if (!check_user_status({ user })) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'need_subscribe' });
      }

      // 同步文档
      const response = await fetch(`${process.env.SERVER_URL}/api/apps/import/docs/${app}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user.id
        })
      });

      const data = (await response.json()) as ServerBaseResponse<string>;

      return { code: data.code, message: data.message };
    }),
  disconnectApp: privateProcedure
    .input(
      z.object({
        app: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      const { app } = input;

      const response = await fetch(`${process.env.SERVER_URL}/api/apps/disconnect/${app}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user.id
        })
      });

      const data = (await response.json()) as ServerBaseResponse<unknown>;

      return data.code === 0 ? true : false;
    }),
  removeFromSearch: privateProcedure
    .input(
      z.object({
        app: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      const { app } = input;

      const response = await fetch(`${process.env.SERVER_URL}/api/apps/remove/from/search/${app}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user.id
        })
      });

      const data = (await response.json()) as ServerBaseResponse<unknown>;

      return { code: data.code, message: data.message };
    }),
  deleteAppDocuments: privateProcedure
    .input(
      z.object({
        app: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      const { app } = input;

      const response = await fetch(`${process.env.SERVER_URL}/api/apps/delete/docs/${app}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user.id
        })
      });

      const data = (await response.json()) as ServerBaseResponse<unknown>;

      return { code: data.code, message: data.message };
    })
});
