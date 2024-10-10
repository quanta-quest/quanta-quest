import React from 'react';

import { Image } from '@nextui-org/react';

import AppLogo from '@/components/logo/app-logo';
import { type SearchResultDocument } from '@/schemas/knowledge-schemes';
import { useAppStore } from '@/store/app-store';

interface NotionSearchResultProperties {
  item: SearchResultDocument;
}

type NotionSearchObjectType = 'database' | 'page' | 'unknown';

const NotionSearchResult = ({ item }: NotionSearchResultProperties) => {
  // SearchResultItem
  // const data = item.data;

  // const getObjectType = (): NotionSearchObjectType => {
  //   const object = data['object'];
  //   if (object === 'page') {
  //     return 'page';
  //   } else if (object === 'database') {
  //     return 'database';
  //   } else {
  //     return 'unknown';
  //   }
  // };

  // const getKey = () => {
  //   return item.pharase_id;
  // };

  // const getTitle = () => {
  //   var title = "";
  //   if (data['title']) {
  //     const titles = data['title'] as [];
  //     title = titles
  //       .map((t) => {
  //         return t['plain_text'];
  //       })
  //       .join(' ');
  //   } else {
  //     const properties = data['properties'] as any;
  //     if (properties) {
  //       if (properties['title']) {
  //         const pTitle = properties['title'];
  //         const titles = pTitle['title'] as [];
  //         title = titles
  //           .map((t) => {
  //             return t['plain_text'];
  //           })
  //           .join(' ');
  //       } else {
  //         var pTitle: null | any = null;
  //         Object.entries(properties).forEach(([key, value]) => {
  //           const data = value as any;
  //           if (data['id'] && data['id'] === 'title') {
  //             pTitle = data;
  //           }
  //         });

  //         if (pTitle) {
  //           const titles = pTitle['title'] as [];
  //           title = titles
  //             .map((t) => {
  //               return t['plain_text'];
  //             })
  //             .join(' ');
  //         }
  //       }
  //     }
  //   }

  //   return title;
  // };

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
          <AppLogo app='notion' size={36} />
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

export default NotionSearchResult;
