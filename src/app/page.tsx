import React from 'react';

import { type Metadata } from 'next';

import { Footer } from '@/components/footer';
import { CallToAction } from '@/components/home/call-to-action';
import { Faqs } from '@/components/home/faqs';
import { Header } from '@/components/home/header';
import { Hero } from '@/components/home/hero';
import { Pricing } from '@/components/home/pricing';
import { PrimaryFeatures } from '@/components/home/primary-features';
import { Testimonials } from '@/components/home/testimonials';

export const metadata: Metadata = {
  title: 'Quanta Quest: AI-Powered Personal Knowledge Management | Boost Productivity',
  description:
    'Quanta Quest revolutionizes personal knowledge management with AI. Connect all your data sources, search intelligently, and boost productivity. Start your free trial today!',
  robots: 'index, follow'
};

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <Header />

      <main>
        <Hero />
        <PrimaryFeatures />
        <Testimonials />
        <Pricing />
        <Faqs />
        <CallToAction />
      </main>

      <Footer />
    </>
  );
}
