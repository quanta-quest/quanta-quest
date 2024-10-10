'use client';

import React from 'react';

import { Accordion, AccordionItem } from '@nextui-org/react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

import backgroundImage from '@/images/background-faqs.jpg';

import { Container } from '../container';

const faqs = [
  {
    question: 'How does Quanta Quest protect my personal data?',
    answer:
      'We prioritize your privacy and security. Your data is encrypted, and our open-source system allows for transparency. We never share or sell your information.'
  },
  {
    question: 'Can I connect all my personal apps and accounts?',
    answer:
      'Yes! Quanta Quest is designed to integrate with a wide variety of personal data sources including Gmail, Dropbox, Notion, and more.'
  },

  {
    question: 'How accurate is the AI-powered search?',
    answer:
      'Our advanced AI algorithms provide highly accurate search results across your connected platforms. The more you use Quanta Quest, the better it becomes at understanding your personal information landscape.'
  },

  {
    question: 'Can I try Quanta Quest before committing to a subscription?',
    answer:
      'Absolutely! We offer a 14-day free trial so you can experience the full power of Quanta Quest before making a decision.'
  },

  {
    question: 'What happens if I want to cancel my subscription?',
    answer:
      // eslint-disable-next-line quotes
      "You can cancel your subscription at any time. We'll keep your data available for 30 days after cancellation, giving you time to export if needed."
  }
];

export function Faqs() {
  return (
    <section
      id='faq'
      aria-labelledby='faq-title'
      className='relative overflow-hidden bg-slate-50 py-20 dark:bg-slate-950 sm:py-32'
    >
      <Image
        className='absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%] dark:opacity-0'
        src={backgroundImage}
        alt=''
        width={1558}
        height={946}
        unoptimized
      />
      <Container className='relative'>
        <div className='mx-auto mb-4 max-w-2xl lg:mx-0 lg:mb-8'>
          <h2
            id='faq-title'
            className='font-display text-3xl tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl'
          >
            Frequently asked questions
          </h2>
          <p className='mt-4 text-lg tracking-tight text-slate-700 dark:text-slate-300'>
            Can&apos;t find what you&apos;re looking for? Reach out to our friendly support team.
          </p>
        </div>

        <Accordion
          fullWidth
          keepContentMounted
          itemClasses={{
            base: 'px-6 !bg-transparent hover:!bg-default-100 !shadow-none data-[open=true]:!bg-default-100',
            title: 'font-medium',
            trigger: 'py-4 md:py-6',
            content: 'pt-0 pb-6 text-base text-default-500',
            indicator: 'data-[open=true]:rotate-180'
          }}
          className='gap-3'
          // items={faqs}
          selectionMode='multiple'
          variant='splitted'
        >
          {faqs.map((item, index) => (
            <AccordionItem key={index} title={item.question} indicator={<ChevronDown width={24} />}>
              {item.answer}
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
