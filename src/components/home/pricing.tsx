import React from 'react';

import { QUANTA_QUEST_PLANS } from '@/lib/constants/subscription-plan-constants';

import { Container } from '../container';
import { Plan } from './plan';

function SwirlyDoodle(properties: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden='true' viewBox='0 0 281 40' preserveAspectRatio='none' {...properties}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M240.172 22.994c-8.007 1.246-15.477 2.23-31.26 4.114-18.506 2.21-26.323 2.977-34.487 3.386-2.971.149-3.727.324-6.566 1.523-15.124 6.388-43.775 9.404-69.425 7.31-26.207-2.14-50.986-7.103-78-15.624C10.912 20.7.988 16.143.734 14.657c-.066-.381.043-.344 1.324.456 10.423 6.506 49.649 16.322 77.8 19.468 23.708 2.65 38.249 2.95 55.821 1.156 9.407-.962 24.451-3.773 25.101-4.692.074-.104.053-.155-.058-.135-1.062.195-13.863-.271-18.848-.687-16.681-1.389-28.722-4.345-38.142-9.364-15.294-8.15-7.298-19.232 14.802-20.514 16.095-.934 32.793 1.517 47.423 6.96 13.524 5.033 17.942 12.326 11.463 18.922l-.859.874.697-.006c2.681-.026 15.304-1.302 29.208-2.953 25.845-3.07 35.659-4.519 54.027-7.978 9.863-1.858 11.021-2.048 13.055-2.145a61.901 61.901 0 0 0 4.506-.417c1.891-.259 2.151-.267 1.543-.047-.402.145-2.33.913-4.285 1.707-4.635 1.882-5.202 2.07-8.736 2.903-3.414.805-19.773 3.797-26.404 4.829Zm40.321-9.93c.1-.066.231-.085.29-.041.059.043-.024.096-.183.119-.177.024-.219-.007-.107-.079ZM172.299 26.22c9.364-6.058 5.161-12.039-12.304-17.51-11.656-3.653-23.145-5.47-35.243-5.576-22.552-.198-33.577 7.462-21.321 14.814 12.012 7.205 32.994 10.557 61.531 9.831 4.563-.116 5.372-.288 7.337-1.559Z'
      />
    </svg>
  );
}

export function Pricing() {
  return (
    <section id='pricing' aria-label='Pricing' className='bg-slate-900 py-20 sm:py-32'>
      <Container>
        <div className='md:text-center'>
          <h2 className='font-display text-3xl tracking-tight text-white sm:text-4xl'>
            <span className='relative whitespace-nowrap'>
              <SwirlyDoodle className='absolute left-0 top-1/2 h-[1em] w-full fill-blue-400' />
              <span className='relative'>Simple pricing,</span>
            </span>{' '}
            for everyone.
          </h2>
          <p className='mt-4 text-lg text-slate-400 dark:text-slate-300'>
            It doesn’t matter what size your knowledge is, our software will work well for you.
          </p>
        </div>
        <div className='-mx-4 mt-16 grid max-w-2xl grid-cols-1 gap-y-10 sm:mx-auto lg:-mx-8 lg:max-w-none lg:grid-cols-3 xl:mx-0 xl:gap-x-8'>
          {QUANTA_QUEST_PLANS.map((plan) => {
            return (
              <div key={plan.key}>
                <Plan
                  id={plan.key}
                  featured={plan.featured}
                  name={plan.name}
                  price={plan.price}
                  description={plan.description}
                  href={plan.href ?? ''}
                  features={plan.features}
                />
              </div>
            );
          })}
          {/* <Plan
            name='Starter'
            price='$9'
            description='Good for anyone who is self-employed and just getting started.'
            href='/register'
            features={[
              'Send 10 quotes and invoices',
              'Connect up to 2 bank accounts',
              'Track up to 15 expenses per month',
              'Manual payroll support',
              'Export up to 3 reports'
            ]}
          />
          <Plan
            featured
            name='Small business'
            price='$15'
            description='Perfect for small / medium sized businesses.'
            href='/register'
            features={[
              'Send 25 quotes and invoices',
              'Connect up to 5 bank accounts',
              'Track up to 50 expenses per month',
              'Automated payroll support',
              'Export up to 12 reports',
              'Bulk reconcile transactions',
              'Track in multiple currencies'
            ]}
          />
          <Plan
            name='Enterprise'
            price='$39'
            description='For even the biggest enterprise companies.'
            href='/register'
            features={[
              'Send unlimited quotes and invoices',
              'Connect up to 15 bank accounts',
              'Track up to 200 expenses per month',
              'Automated payroll support',
              'Export up to 25 reports, including TPS'
            ]}
          /> */}
        </div>
      </Container>
    </section>
  );
}
