import { TRPCError } from '@trpc/server';
import { observable } from '@trpc/server/observable';
import { z } from 'zod';

import { type SearchResultDocument, type SearchResultWithAI } from '@/schemas/knowledge-schemes';
import { type ServerBaseResponse } from '@/schemas/server-response';
import { check_user_status } from '@/service/users';

import { privateProcedure, router } from '../trpc';

export const knowledgeRouter = router({
  search: privateProcedure
    .input(
      z.object({
        query: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      const { query } = input;

      if (!check_user_status({ user })) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'need_subscribe' });
      }

      const response = await fetch(`${process.env.SERVER_URL}/api/knowledge/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user.id,
          query: query
        })
      });

      const data = (await response.json()) as ServerBaseResponse<SearchResultDocument[]>;

      return data.code === 0 && data.data ? (data.data as []) : [];
    }),
  // searchWithAISSE: privateProcedure
  //   .input(
  //     z.object({
  //       query: z.string()
  //     })
  //   )
  //   .subscription(async ({ ctx, input }) => {
  //     const { user } = ctx;
  //     const { query } = input;

  //     return observable<string>((emit) => {
  //       const eventSource = new EventSource(
  //         `${process.env.SERVER_URL}/api/knowledge/ai-search-sse`
  //       );

  //       eventSource.onmessage = (event) => {
  //         emit.next(event.data);
  //       };

  //       eventSource.onerror = (error) => {
  //         console.error('SSE Error:', error);
  //         emit.error(error);
  //       };

  //       return () => {
  //         eventSource.close();
  //       };
  //     });
  //   }),
  searchStream: privateProcedure
    .input(
      z.object({
        query: z.string()
      })
    )
    .subscription((options) => {
      console.log('start subscription');
      const { user } = options.ctx;
      const { query } = options.input;
      return observable<string>((emit) => {
        console.log('start observable');
        const controller = new AbortController();
        const { signal } = controller;
        const fetchData = async () => {
          console.log('start fetchData');
          try {
            const response = await fetch(`${process.env.SERVER_URL}/api/knowledge/search/stream`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                user_id: user.id,
                query: query
              }),
              signal
            });
            const reader = response.body?.getReader();
            if (!reader) throw new Error('No reader available');

            const decoder = new TextDecoder();
            while (true) {
              console.log('while loop');
              const { done, value } = await reader.read();
              if (done) break;
              const chunk = decoder.decode(value, { stream: true });
              const lines = chunk.split('\n');
              console.log('chunk', chunk);
              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  const data = line.slice(6);
                  console.log('emit.next', data);
                  emit.next(data);
                  console.log('emit.next finish');
                }
              }
            }
          } catch (error) {
            if (error instanceof Error) {
              console.error('SSE Error:', error);
              emit.error(error);
            }
          } finally {
            emit.complete();
          }
        };

        fetchData().catch((error) => {
          console.error('Fetch Data Error:', error);
          emit.error(error);
        });

        return () => {
          controller.abort();
        };
      });
    }),

  searchWithAI: privateProcedure
    .input(
      z.object({
        query: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      const { query } = input;

      if (!check_user_status({ user })) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'need_subscribe' });
      }

      const response = await fetch(`${process.env.SERVER_URL}/api/knowledge/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user.id,
          query: query
        })
      });

      const data = (await response.json()) as ServerBaseResponse<SearchResultWithAI>;

      // eslint-disable-next-line unicorn/prefer-ternary
      if (data.code === 0 && data.data) {
        return {
          results: data.data.results,
          aiResult: data.data.ai_result
        };
      } else {
        return {
          results: [],
          aiResult: ''
        };
      }
    })
});
