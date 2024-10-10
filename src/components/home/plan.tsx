'use client';

import React, { useState } from 'react';

import { LoginLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import { trpc } from '@/app/_trpc/client';
import { getStripe } from '@/lib/stripe-client';
import { cn } from '@/lib/utils';

function CheckIcon({ className, ...properties }: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      aria-hidden='true'
      className={cn('h-6 w-6 flex-none fill-current stroke-current', className)}
      {...properties}
    >
      <path
        d='M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z'
        strokeWidth={0}
      />
      <circle
        cx={12}
        cy={12}
        r={8.25}
        fill='none'
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export function Plan({
  id,
  name,
  price,
  description,
  href,
  features,
  featured = false
}: {
  id: string;
  name: string;
  price: string;
  description: string;
  href: string;
  features: Array<string>;
  featured?: boolean;
}) {
  const { user } = useKindeBrowserClient();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const { mutate: createPortalUrl } = trpc.stripe.createPortalUrl.useMutation({
    onSuccess: async ({ url }) => {
      router.push(url);
    },
    onSettled: () => {
      setLoading(false);
    },
    onMutate: () => {
      setLoading(true);
    }
  });

  const { mutate: getCheckoutSession } = trpc.stripe.getCheckoutSession.useMutation({
    onSuccess: async ({ sessionUrl }) => {
      // const stripe = await getStripe();
      // if (stripe) {
      //   await stripe.redirectToCheckout({ sessionId: sessionId });
      // }
      if (sessionUrl) {
        router.push(sessionUrl);
      }
    },
    onSettled: () => {
      setLoading(false);
    },
    onMutate: () => {
      setLoading(true);
    }
  });
  const pressButton = () => {
    if (!user) {
      // redirect to login page
      return;
      // user loged in
    }

    //TODO: if user is subscribed, to custome portal
    // if user is free, to checkout page
    // createPortalUrl();
    getCheckoutSession({
      key: id
    });
  };

  const UserGetStartButton = () => {
    return user ? (
      <Button
        href={href}
        variant={featured ? 'faded' : 'bordered'}
        color={featured ? 'primary' : 'secondary'}
        className={cn(
          'mt-8 dark:border-white',
          featured ? 'dark:bg-white' : 'dark:text-foreground'
        )}
        aria-label={`Get started with the ${name} plan for ${price}`}
        onPress={() => {
          pressButton();
        }}
        isLoading={loading}
      >
        Get started
      </Button>
    ) : (
      <Button
        variant={featured ? 'faded' : 'bordered'}
        color={featured ? 'primary' : 'secondary'}
        className={cn(
          'mt-8 dark:border-white',
          featured ? 'dark:bg-white' : 'dark:text-foreground'
        )}
        aria-label={`login with the ${name} plan for ${price}`}
      >
        <LoginLink>Get Start</LoginLink>
      </Button>
    );
  };
  return (
    <section
      className={cn(
        'flex flex-col rounded-3xl px-6 sm:px-8',
        featured ? 'order-first bg-blue-600 py-8 lg:order-none' : 'lg:py-8'
      )}
    >
      <p className='font-display mt-5 text-xl text-white'>
        {id === 'monthly' && (
          <span className='mr-2 text-base text-gray-200 line-through'>$16.00</span>
        )}
        {price}
      </p>
      <p className={cn('mt-2 text-base', featured ? 'text-white' : 'text-slate-400')}>
        {description}
      </p>
      <h3 className='font-display order-first text-5xl font-light tracking-tight text-white'>
        {name}
      </h3>
      <ul
        className={cn(
          'order-last mt-10 flex flex-col gap-y-3 text-sm',
          featured ? 'text-white' : 'text-slate-200'
        )}
      >
        {features.map((feature) => (
          <li key={feature} className='flex'>
            <CheckIcon className={featured ? 'text-green-400' : 'text-green-800'} />
            <span className='ml-4'>{feature}</span>
          </li>
        ))}
      </ul>
      <UserGetStartButton />
    </section>
  );
}
