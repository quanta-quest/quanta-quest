import React from 'react';

import { Avatar } from '@nextui-org/react';

interface UserAvaterProperties {
  imageUrl: string | null;
  firstName: string | null;
  lastName: string | null;
}

const UserAvater = ({ imageUrl, firstName, lastName }: UserAvaterProperties) => {
  return (
    <>
      <Avatar isBordered className='flex-none' size='sm' src={imageUrl ?? ''} />
    </>
  );
};

export default UserAvater;
