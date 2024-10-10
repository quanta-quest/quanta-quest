import React from 'react';

import { SearchResultDocument } from '@/schemas/knowledge-schemes';

import AppLogo from '../logo/app-logo';

interface DropboxSearchResultProperties {
  item: SearchResultDocument;
}

const DropboxSearchResult = ({ item }: DropboxSearchResultProperties) => {
  const getTitle = () => {
    return item.title;
  };

  const getContent = () => {
    return item.content;
  };

  const getKey = () => {
    return item.key;
  };

  return (
    <div className='flex w-full flex-col items-start justify-center gap-2' key={getKey()}>
      <div className='flex gap-2'>
        <div className='flex items-center justify-center rounded-md border px-4 py-1 dark:border-slate-500'>
          {/* <Image
                radius='none'
                alt={notion ? notion.key : 'logo'}
                src={notion ? notion.icon : ''}
                width={'36'}
              /> */}
          <AppLogo app='dropbox' size={36} />
        </div>
        <div className='flex flex-col gap-1'>
          <div className='text-lg font-bold'>{getTitle()}</div>
          {/* <div className='text-md text-default-400'>{getObjectType().toUpperCase()}</div> */}
          <div className='text-md line-clamp-2 text-wrap text-default-500'>{getContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default DropboxSearchResult;
