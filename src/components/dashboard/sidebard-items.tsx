import React from 'react'; // Add this line

import type { SidebarItem } from './sidebar';

import { Chip } from '@nextui-org/react';
import { CirclePlus, House, LayoutGrid, Search } from 'lucide-react';

/**
 * Please check the https://nextui.org/docs/guide/routing to have a seamless router integration
 */
export const sectionItems: SidebarItem[] = [
  {
    key: 'overview',
    title: 'Overview',
    items: [
      {
        key: 'dashboard',
        href: '/dashboard',
        icon: <House className='' width={24} />,
        title: 'Dashboard'
      },
      // {
      //   key: 'search',
      //   href: '/search',
      //   icon: <Search className='' width={24} />,
      //   title: 'Search'
      // },
      {
        key: 'apps',
        href: '/apps',
        icon: <LayoutGrid className='' width={24} />,
        title: 'Apps'
      }
    ]
  }
  //   {
  //     key: 'organization',
  //     title: 'Organization',
  //     items: [
  //       {
  //         key: 'cap_table',
  //         href: '#',
  //         title: 'Cap Table',
  //         icon: 'solar:pie-chart-2-outline',
  //         items: [
  //           {
  //             key: 'shareholders',
  //             href: '#',
  //             title: 'Shareholders'
  //           },
  //           {
  //             key: 'note_holders',
  //             href: '#',
  //             title: 'Note Holders'
  //           },
  //           {
  //             key: 'transactions_log',
  //             href: '#',
  //             title: 'Transactions Log'
  //           }
  //         ]
  //       },
  //       {
  //         key: 'analytics',
  //         href: '#',
  //         icon: 'solar:chart-outline',
  //         title: 'Analytics'
  //       },
  //       {
  //         key: 'perks',
  //         href: '/perks',
  //         icon: 'solar:gift-linear',
  //         title: 'Perks',
  //         endContent: (
  //           <Chip size='sm' variant='flat'>
  //             3
  //           </Chip>
  //         )
  //       },
  //       {
  //         key: 'expenses',
  //         href: '#',
  //         icon: 'solar:bill-list-outline',
  //         title: 'Expenses'
  //       },
  //       {
  //         key: 'settings',
  //         href: '/settings',
  //         icon: 'solar:settings-outline',
  //         title: 'Settings'
  //       }
  //     ]
  //   }
];
