import React from 'react';

import { Container } from '@/components/container';
import { Footer } from '@/components/footer';
import { Header } from '@/components/home/header';

const page = () => {
  return (
    <>
      <Header />
      <main>
        <Container className='py-16 text-center lg:py-32'>
          <div className='flex flex-col gap-8'>
            <div className=''>
              {/* title */}
              <h1 className='text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl'>
                Privacy policy
              </h1>
              <p className='mt-4 text-base leading-7 text-slate-600 dark:text-slate-400'>
                Last updated: 2024-09-24
              </p>
            </div>

            <div className='text-md mx-auto mt-8 flex max-w-[40rem] flex-col gap-2 text-start text-zinc-600 dark:text-slate-400 lg:mt-16'>
              <h2 className='mb-1 mt-2 text-xl font-bold leading-normal text-gray-800 dark:text-gray-200'>
                Introduction
              </h2>
              <p>Privacy Policy for Ken-en-toshi AI Search Service</p>
              <p>
                Ken-en-toshi (&rdquo;we,&rdquo; &rdquo;our,&rdquo; or &rdquo;us&rdquo;) is committed
                to protecting your privacy. This Privacy Policy explains how we collect, use, and
                safeguard your personal information in relation to our AI-powered search service
                that links personal data from various platforms such as Notion, Twitter, Dropbox,
                and Google Workspace.
              </p>
              <h2 className='mb-1 mt-2 text-xl font-bold leading-normal text-gray-800 dark:text-gray-200'>
                Information Collection and Storage{' '}
              </h2>
              <p>
                - User account information: We collect and store basic account information,
                including your name, email address, and any other information you provide when
                creating an account.
              </p>
              <p>
                - Connected platform data: Our service accesses and processes data from your
                connected platforms (e.g., Notion, Twitter, Dropbox, Google Workspace) to perform
                searches and provide our service.
              </p>
              <p>
                Important: We securely store encrypted versions of your original data from connected
                platforms. This data is processed using vector database technology to enhance search
                accuracy and performance. We do not have access to the unencrypted original data.
              </p>
              <p className='font-bold'>
                Important Notice: We explicitly declare that Google Workspace APIs are not used for
                developing, improving, or training general AI and ML models. Our use of these APIs
                is strictly limited to providing our specific search service to you.
              </p>
              <h2 className='mb-1 mt-2 text-xl font-bold leading-normal text-gray-800 dark:text-gray-200'>
                Use of Information
              </h2>
              <p>We use your information for the following purposes:</p>
              <p>- To create and manage your user account </p>
              <p>- To authenticate your access to our service</p>
              <p>
                - To process and store encrypted versions of your data for search functionality{' '}
              </p>
              <p>
                - To improve and optimize our AI search functionality using vector database
                technology
              </p>
              <p>- To communicate with you about your account and our service</p>
              <p>- To comply with legal obligations</p>
              <h2 className='mb-1 mt-2 text-xl font-bold leading-normal text-gray-800 dark:text-gray-200'>
                Data Storage and Security
              </h2>
              <p>
                We take the security of your personal information seriously. We implement
                industry-standard security measures to protect your data from unauthorized access,
                disclosure, alteration, and destruction. All stored data, including your account
                information and encrypted data from connected platforms, is secured using
                state-of-the-art encryption methods both in transit and at rest.
              </p>
              <p>
                Our use of vector database technology for processing your data allows us to provide
                accurate search results while maintaining a high level of data security and privacy.
              </p>
              <h2 className='mb-1 mt-2 text-xl font-bold leading-normal text-gray-800 dark:text-gray-200'>
                Data Sharing
              </h2>
              <p>
                We do We do not sell, rent, or share your personal information with third parties
                for their marketing purposes. We may share your information in the following limited
                circumstances:
              </p>
              <p>
                - With service providers who assist us in operating our business and providing our
                services, subject to strict confidentiality agreements
              </p>
              <p>- If required by law, such as in response to a subpoena or court order</p>
              <p>
                - In the event of a merger, acquisition, or sale of all or a portion of our assets,
                with the acquiring company
              </p>
              <h2 className='mb-1 mt-2 text-xl font-bold leading-normal text-gray-800 dark:text-gray-200'>
                User Rights
              </h2>
              <p>You have the following rights regarding your personal information:</p>
              <p>- Access: You can request access to the personal information we hold about you.</p>
              <p>
                - You can request that we delete your account and associated information, including
                all encrypted data stored from your connected platforms.{' '}
              </p>
              <p>
                - Deletion: You can request that we delete your account and associated information.{' '}
              </p>
              <p>- Objection: You can object to our processing of your personal information. </p>
              <p>
                - Data Portability: You can request a copy of your personal information in a
                structured, commonly used, and machine-readable format.{' '}
              </p>
              <p>
                To exercise these rights, please contact us using the information provided in the
                &rdquo;Contact Information&rdquo; section below.
              </p>
              <h2 className='mb-1 mt-2 text-xl font-bold leading-normal text-gray-800 dark:text-gray-200'>
                Changes to the Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our
                practices or for other operational, legal, or regulatory reasons. We will notify you
                of any material changes by posting the new Privacy Policy on our website and
                updating the &rdquo;Last Updated&rdquo; date. We encourage you to review this
                Privacy Policy periodically.
              </p>
              <h2 className='mb-1 mt-2 text-xl font-bold leading-normal text-gray-800 dark:text-gray-200'>
                Contact Information
              </h2>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or
                our data practices, please contact us at:{' '}
              </p>
              <p>Ken-en-toshi Email: privacy@ken-en-toshi.com</p>
              <p>Address: 5-12-4-1203 Kachidoki, Chuo-ku, Tokyo Last Updated: 31 08 2024</p>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default page;
