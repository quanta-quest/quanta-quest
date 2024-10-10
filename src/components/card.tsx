import React from 'react';

import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';

const NextCard = () => {
  return (
    <Card className='py-4'>
      <CardHeader className='flex-col items-start px-4 pb-0 pt-2'>
        <p className='text-tiny font-bold uppercase'>Daily Mix</p>
        <small className='text-default-500'>12 Tracks</small>
        <h4 className='text-large font-bold'>Frontend Radio</h4>
      </CardHeader>
      <CardBody className='overflow-visible py-2'>
        <Image
          alt='Card background'
          className='rounded-xl object-cover'
          src='https://nextui.org/images/hero-card-complete.jpeg'
          width={270}
        />
      </CardBody>
    </Card>
  );
};

export default NextCard;
