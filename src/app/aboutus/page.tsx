import React from 'react';

import { Code, Goal, Shield } from 'lucide-react';
import { Metadata } from 'next';

import { Container } from '@/components/container';
import { Footer } from '@/components/footer';
import { Header } from '@/components/home/header';

export const metadata: Metadata = {
  title: 'Quanta Quest: About Quanta Quest | AI Innovation for Personal Knowledge Management',
  description:
    'Discover how Quanta Quest is revolutionizing personal knowledge management with AI. Learn about our mission, values, and commitment to data security and open-source principles.',
  keywords: 'AI innovation, personal knowledge management, data security',
  applicationName: 'Quanta Quest',
  robots: 'index, follow',
  icons: '/logo.png'
};

const principles = [
  {
    title: 'Unwavering Commitment to Data Security',
    description:
      'Your trust is our top priority. We implement state-of-the-art security measures to ensure your data remains private and protected at all times.',
    icon: Shield
  },
  {
    title: 'Championing the Open Source Spirit',
    description:
      'We believe in transparency and collaboration. Our open-source approach fosters innovation and allows our community to contribute to and improve our solutions.',
    icon: Code
  },
  {
    title: 'Relentless Pursuit of Excellence',
    description:
      // eslint-disable-next-line quotes
      "We are committed to continuous improvement, constantly pushing the boundaries of what's possible with AI to deliver superior products that enhance your life.",
    icon: Goal
  }
];

const Page = () => {
  return (
    <>
      <Header />
      <main>
        <section className='py-20 sm:py-32'>
          <Container>
            <div className='flex flex-col gap-6 text-center'>
              <h1 className='text-3xl font-extrabold lg:text-6xl'>Empowering Humans with AI</h1>
              <p className='text-balance text-muted-foreground lg:text-lg'>
                At Quanta Quest, we&apos;re on a mission to enhance human potential through
                intelligent technology.
              </p>
            </div>
          </Container>
        </section>

        <section className='py-32'>
          <Container>
            <div className='flex flex-col gap-6 text-center'>
              <h2 className='text-xl font-extrabold lg:text-4xl'>
                Revolutionizing Work and Life with AI
              </h2>
              <p className='text-balance text-muted-foreground lg:text-lg'>
                Quanta Quest is dedicated to leveraging the power of AI to boost human productivity
                and efficiency in both professional and personal spheres. We believe that by
                harnessing cutting-edge technology, we can create tools that seamlessly integrate
                into your daily life, making information management effortless and intuitive.
              </p>
            </div>
          </Container>
        </section>

        <section
          id='principles'
          aria-label='Features for simplifying everyday business tasks'
          className='bg-slate-50 pt-20 backdrop:pb-14 dark:bg-slate-800 sm:pb-20 sm:pt-32 lg:pb-32'
        >
          <Container>
            <div className='container z-10 flex flex-col space-y-14'>
              <h2 className='font-display text-center text-3xl tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl md:mb-6 lg:mb-10 lg:px-10'>
                Guiding Principles That Define Us
              </h2>
              <div className='relative mt-8 md:mt-10'>
                <div className='absolute top-0 -mx-[calc(theme(container.padding))] h-px w-full bg-border 2xl:-mx-[calc((100vw-100%)/2)]' />
                <div className='grid divide-border md:grid-cols-3 md:divide-x'>
                  {principles.map((principle, index) => (
                    <div key={index} className='relative px-6 pb-20 md:pb-10 lg:px-10'>
                      <div className='absolute top-0 -mx-[calc(24px+theme(container.padding))] h-px w-full bg-border md:hidden' />
                      <div className='relative -mt-6 mb-10 flex aspect-square w-12 items-center justify-center text-primary md:-mt-10 md:mb-10 md:w-20'>
                        <principle.icon className='size-20' />
                      </div>
                      <div>
                        <h3 className='mb-3 max-w-48 text-lg font-semibold md:mb-4 md:text-2xl lg:mb-6'>
                          {principle.title}
                        </h3>
                        <p className='text-muted-foreground lg:text-lg'>{principle.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='absolute bottom-0 -mx-[calc(theme(container.padding))] h-px w-full bg-border 2xl:-mx-[calc((100vw-100%)/2)]' />
              </div>
            </div>
          </Container>
        </section>

        <section className='py-32'>
          <Container className='flex flex-col gap-6'>
            <div className='flex flex-col gap-6 text-center'>
              <h2 className='text-xl font-extrabold lg:text-4xl'>Meet Quanta Quest</h2>
              <p className='text-balance text-muted-foreground lg:text-lg'>
                Quanta Quest is our flagship product, designed to revolutionize personal knowledge
                management. It&apos;s an AI-powered platform that seamlessly connects and searches
                across all your personal data sources, bringing order to your digital life.
              </p>
            </div>
            <div className='flex flex-col justify-between rounded-lg bg-gray-200 p-8 dark:bg-gray-800 lg:p-12'>
              <div>
                <h3 className='mb-2 text-xl font-medium lg:text-2xl'>Key Features</h3>
                <ul className='flex list-disc flex-col gap-2 text-sm text-muted-foreground lg:text-base'>
                  <li>
                    Unified Data Access: Connect and search across multiple platforms from a single
                    interface.
                  </li>
                  <li>
                    AI-Powered Search: Our advanced algorithms understand context, making
                    information retrieval faster and more accurate.
                  </li>
                  <li>
                    Privacy-First Design: Built with a focus on data security, ensuring your
                    information stays yours.
                  </li>
                  <li>
                    Personalized Insights: Gain new perspectives on your data with AI-generated
                    summaries and connections.
                  </li>
                  <li>
                    Open-Source Framework: Benefit from community-driven improvements and
                    customizations.
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </section>

        <section className='py-32'>
          <Container>
            <div className='flex flex-col gap-6 text-center'>
              <h2 className='text-xl font-extrabold lg:text-4xl'>
                Building a Better Future, Together
              </h2>
              <p className='text-balance text-muted-foreground lg:text-lg'>
                At Quanta Quest, we&apos;re not just creating products; we&apos;re shaping the
                future of human-AI interaction. Our commitment to data security, open-source
                principles, and cutting-edge technology drives us to continuously innovate and
                provide solutions that truly make a difference in people&apos;s lives.
              </p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Page;
