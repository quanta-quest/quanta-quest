import React from 'react';

interface NotionDataBaseResultProperties {
  title: string;
}

const NotionDataBaseResult = ({ title }: NotionDataBaseResultProperties) => {
  return (
    <div className='flex w-full flex-col items-start justify-center gap-6'>
      <div className='flex text-lg'>{title}</div>
    </div>
  );
};

export default NotionDataBaseResult;
