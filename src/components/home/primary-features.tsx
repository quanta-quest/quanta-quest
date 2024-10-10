'use client';

import React from 'react';

import { Database, Search, Shield } from 'lucide-react';
import Image from 'next/image';

import backgroundImage from '@/images/background-faqs.jpg';

import { Container } from '../container';

const features = [
  {
    id: 'feature-1',
    title: 'Privacy-First Security',
    description:
      'Your data stays yours. Our open-source system ensures transparency and top-notch security.',
    icon: Shield
  },
  {
    id: 'feature-2',
    title: 'Unified Personal Data',
    description:
      'Connect your Gmail, Dropbox, Notion, and more for a comprehensive personal knowledge base.',
    icon: Database
  },
  {
    id: 'feature-3',
    title: 'AI-Powered Search',
    description:
      'Find exactly what you need across all your personal platforms with intelligent search.',
    icon: Search
  }
];

export function PrimaryFeatures() {
  return (
    <section
      id='features'
      aria-label='Features for simplifying everyday business tasks'
      className='relative overflow-hidden bg-slate-50 pt-20 backdrop:pb-14 dark:bg-slate-950 sm:pb-20 sm:pt-32 lg:pb-32'
    >
      <Image
        className='absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%] dark:opacity-0'
        src={backgroundImage}
        alt=''
        width={1558}
        height={200}
        unoptimized
      />
      <Container className='relative'>
        <div className='container relative z-10 flex flex-col space-y-14'>
          <h2 className='font-display text-center text-3xl tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl md:mb-6 lg:mb-10 lg:px-10'>
            Unlock the Power of Your Personal Data
          </h2>
          <div className='relative mt-8 md:mt-10'>
            <div className='grid divide-border md:grid-cols-3 md:divide-x'>
              {features.map((feature) => (
                <div key={feature.id} className='relative px-6 pb-20 md:pb-10 lg:px-10'>
                  <div className='absolute top-0 -mx-[calc(24px+theme(container.padding))] h-px w-full bg-border md:hidden' />
                  <div className='relative -mt-6 mb-10 flex aspect-square w-12 items-center justify-center text-primary md:-mt-10 md:mb-10 md:w-20'>
                    <feature.icon className='size-20' />
                  </div>
                  <div>
                    <h3 className='mb-3 max-w-48 text-lg font-semibold md:mb-4 md:text-2xl lg:mb-6'>
                      {feature.title}
                    </h3>
                    <p className='text-muted-foreground lg:text-lg'>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
