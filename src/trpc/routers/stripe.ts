import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { db } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

import { privateProcedure, router } from '../trpc';

export const stripeRouter = router({
  getCheckoutSession: privateProcedure
    .input(
      z.object({
        // price: z.string(),
        key: z.string(),
        quantity: z.number().default(1)
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      const { key, quantity } = input;

      let priceId = '';
      switch (key) {
        case 'monthly': {
          priceId = process.env.STRIPE_MONTHLY_PRICE_ID ?? '';
        }
        case 'yearly': {
          priceId = process.env.STRIPE_YEARLY_PRICE_ID ?? '';
        }
        case 'quarterly': {
          priceId = process.env.STRIPE_QUARTERLY_PRICE_ID ?? '';
        }
        // No default
      }

      // generate stripe checkout session, needs three values;
      // - customer: the customer id in stripe, if not exists, create first
      // - price: price id in stripe, need to be config in .env
      // - quantity: product quntity, set as 1
      const stripe_customer_id = user.stripe_customer_id;
      let customer: {
        id: string;
      };
      if (stripe_customer_id) {
        customer = {
          id: stripe_customer_id
        };
      } else {
        // not connect to stripe customer, need to create
        const customerData: {
          metadata: {
            dbId: number;
          };
        } = {
          metadata: {
            dbId: user.id
          }
        };

        const response = await stripe.customers.create(customerData);

        customer = { id: response.id };

        await db.user.update({
          where: {
            id: user.id
          },
          data: {
            stripe_customer_id: response.id
          }
        });
      }

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

      if (!customer?.id) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to get a customer id'
        });
      }

      try {
        const session = await stripe.checkout.sessions.create({
          success_url: `${baseUrl}/profile?action=checkout-success`,
          customer: customer?.id,
          // payment_method_types: ['card'],
          mode: 'subscription',
          line_items: [
            {
              price: priceId,
              quantity
            }
          ],
          metadata: {
            userId: user.id,
            priceId: priceId,
            quantity: quantity
          },
          subscription_data: {
            metadata: {
              userId: user.id
            }
          }
        });

        if (session) {
          return { sessionId: session.id, sessionUrl: session.url };
        } else {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to create a session'
          });
        }
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create a session'
        });
      }
    }),
  createPortalUrl: privateProcedure.mutation(async ({ ctx }) => {
    const { user } = ctx;
    let customer;
    if (user.stripe_customer_id && user.stripe_customer_id !== '') {
      // get the stripe customer
      customer = {
        id: user.stripe_customer_id
      };
    } else {
      // create user subscription
      const customerData: {
        metadata: {
          dbId: number;
        };
      } = {
        metadata: {
          dbId: user.id
        }
      };

      const response = await stripe.customers.create(customerData);

      customer = { id: response.id };

      await db.user.update({
        where: {
          id: user.id
        },
        data: {
          stripe_customer_id: response.id
        }
      });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

    if (!customer?.id) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to get a customer id'
      });
    }

    try {
      const billingPortalResponse = await stripe.billingPortal.sessions.create({
        customer: customer.id,
        return_url: `${baseUrl}/profile`
      });

      if (billingPortalResponse) {
        return { url: billingPortalResponse.url };
      } else {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create a portal'
        });
      }
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to create a portal'
      });
    }
  })
});
