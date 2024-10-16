import { z } from 'zod';

import { db } from '@/lib/prisma';
import { ServerBaseResponse } from '@/schemas/server-response';

import { privateProcedure, router } from '../trpc';

export const documentsRouter = router({
  getDocuments: privateProcedure
    .input(
      z.object({
        appId: z.number(),
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(10),
        keyword: z.string().default('')
      })
    )
    .query(async ({ ctx, input }) => {
      const { user } = ctx;
      const { page, limit, appId, keyword } = input;
      const skip = (page - 1) * limit;

      const documents = await db.app_document.findMany({
        where: {
          user_id: user.id,
          app_id: appId,
          OR: [
            {
              title: {
                contains: keyword,
                mode: 'insensitive' // 忽略大小写
              }
            },
            {
              content: {
                contains: keyword,
                mode: 'insensitive' // 忽略大小写
              }
            }
          ]
        },
        include: {
          app_pharase: true // 加载关联的 app_phrase 数组
        },
        take: limit,
        skip: skip,
        orderBy: {
          id: 'asc'
        }
      });
      const total = await db.app_document.count({
        where: {
          user_id: user.id,
          app_id: appId,
          OR: [
            {
              title: {
                contains: keyword,
                mode: 'insensitive' // 忽略大小写
              }
            },
            {
              content: {
                contains: keyword,
                mode: 'insensitive' // 忽略大小写
              }
            }
          ]
        }
      });
      const results = documents.map((document_) => {
        const {
          additional_data,
          create_time,
          update_time,
          indexed_at,
          app_pharase,
          ...documentWithoutAdditionalData
        } = document_;
        return {
          additional_data: additional_data ? JSON.stringify(additional_data) : '',
          indexed_at: indexed_at?.getTime() ?? 0,
          app_pharase_count: app_pharase.length,
          ...documentWithoutAdditionalData
        };
      });
      return {
        results,
        hasMore: skip + results.length < total,
        total
      };
    }),
  reloadDocument: privateProcedure
    .input(
      z.object({
        documentId: z.number()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      const { documentId } = input;

      const response = await fetch(`${process.env.SERVER_URL}/api/documents/reload/${documentId}`, {
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
  deleteDocument: privateProcedure
    .input(
      z.object({
        documentId: z.number()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      const { documentId } = input;

      const response = await fetch(`${process.env.SERVER_URL}/api/documents/${documentId}`, {
        method: 'DELETE',
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
  removeFromSearch: privateProcedure
    .input(
      z.object({
        documentId: z.number()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      const { documentId } = input;

      const response = await fetch(
        `${process.env.SERVER_URL}/api/documents/remove/from/search/${documentId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: user.id
          })
        }
      );

      const data = (await response.json()) as ServerBaseResponse<unknown>;

      return { code: data.code, message: data.message };
    })
});
