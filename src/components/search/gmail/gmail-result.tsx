import React from 'react';

import { Chip } from '@nextui-org/react';

import AppLogo from '@/components/logo/app-logo';
import { removeUrlsFromString } from '@/lib/utils';
import { type SearchResultDocument } from '@/schemas/knowledge-schemes';

interface NotionSearchResultProperties {
  item: SearchResultDocument;
}

const GmailSearchResult = ({ item }: NotionSearchResultProperties) => {
  // const data = item.data;

  // const getLabelTags = (): string[] => {
  //   const labels = data['labelIds'] as string[];
  //   return labels;
  // };

  // const getContent = (): string => {
  //   const content = data['content'] as string;
  //   return content;
  // };

  // const getSnippet = (): string => {
  //   const snippet = data['snippet'] as string;
  //   return snippet;
  // };

  const getContent = () => {
    if (item.content) return removeUrlsFromString(item.content);
  };

  const getTitle = () => {
    return item.title;
  };

  const getKey = () => {
    return item.key;
  };

  return (
    <div className='flex w-full flex-col items-start justify-center gap-2' key={getKey()}>
      <div className='flex gap-2'>
        <div className='flex items-center justify-center rounded-md border p-4'>
          {/* <Image
          radius='none'
          alt={notion ? notion.key : 'logo'}
          src={notion ? notion.icon : ''}
          width={'36'}
        /> */}
          <AppLogo app='gmail' size={36} />
        </div>
        <div className='flex flex-col gap-1'>
          <div className='text-lg font-bold'>{getTitle()}</div>
          {/* <div className='flex items-start justify-start gap-1'>
            {getLabelTags().map((label) => {
              return (
                <Chip key={label} size='sm'>
                  {label}
                </Chip>
              );
            })}
          </div> */}
          <div className='text-md line-clamp-2 text-wrap text-default-500'>{getContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default GmailSearchResult;
