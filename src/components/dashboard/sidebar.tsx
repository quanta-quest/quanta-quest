'use client';

import React, { useEffect } from 'react';

import type { ListboxProps, ListboxSectionProps, Selection } from '@nextui-org/react';

import { Listbox, ListboxItem, ListboxSection, Tooltip } from '@nextui-org/react';

import { cn } from '@/lib/utils';

export type SidebarItem = {
  key: string;
  title: string;
  icon?: React.ReactNode;
  href?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  items?: SidebarItem[];
  className?: string;
};

export type SidebarProperties = Omit<ListboxProps<SidebarItem>, 'children'> & {
  items: SidebarItem[];
  isCompact?: boolean;
  iconClassName?: string;
  sectionClasses?: ListboxSectionProps['classNames'];
  classNames?: ListboxProps['classNames'];
  defaultSelectedKey: string;
  onSelect?: (key: string) => void;
};

const Sidebar = React.forwardRef<HTMLElement, SidebarProperties>(
  (
    {
      items,
      isCompact,
      defaultSelectedKey,
      onSelect,
      sectionClasses: sectionClassesProperty = {},
      itemClasses: itemClassesProperty = {},
      iconClassName,
      classNames,
      className,
      ...properties
    }: SidebarProperties,
    reference
  ) => {
    const [selected, setSelected] = React.useState<React.Key>(defaultSelectedKey);

    const sectionClasses = {
      ...sectionClassesProperty,
      base: cn(sectionClassesProperty?.base, 'w-full', {
        'p-0 max-w-[44px]': isCompact
      }),
      group: cn(sectionClassesProperty?.group, {
        'flex flex-col gap-1': isCompact
      }),
      heading: cn(sectionClassesProperty?.heading, {
        hidden: isCompact
      })
    };

    const itemClasses = {
      ...itemClassesProperty,
      base: cn(itemClassesProperty?.base, {
        'w-11 h-11 gap-0 p-0': isCompact
      })
    };

    const renderItem = React.useCallback(
      (item: SidebarItem) => {
        return (
          <ListboxItem key={item.key} href={item.href} textValue={item.key}>
            <Tooltip content={`${item.title}`} placement='right'>
              <div className='flex w-full items-center justify-center'>{item.icon}</div>
            </Tooltip>
          </ListboxItem>
        );
      },
      [iconClassName, itemClasses?.base]
    );

    useEffect(() => {
      //第一次加载时，判断路由
      const path = window.location.pathname;
      const splitPaths = path.split('/');
      if (splitPaths.length > 1) {
        setSelected(splitPaths[1] ?? '');
      } else {
        setSelected(defaultSelectedKey);
      }
    }, []);

    return (
      <Listbox
        key='compact'
        ref={reference}
        hideSelectedIcon
        as='nav'
        className={cn('list-none', className)}
        classNames={{
          ...classNames,
          list: cn('items-center', classNames?.list)
        }}
        color='default'
        itemClasses={{
          ...itemClasses,
          base: cn(
            'px-3 min-h-11 rounded-large h-[44px] data-[selected=true]:bg-default-100',
            itemClasses?.base
          ),
          title: cn(
            'text-small font-medium text-default-500 group-data-[selected=true]:text-foreground',
            itemClasses?.title
          )
        }}
        items={items}
        selectedKeys={[selected] as unknown as Selection}
        selectionMode='single'
        variant='flat'
        onSelectionChange={(keys) => {
          const key = [...keys][0];

          setSelected(key as React.Key);
          onSelect?.(key as string);
        }}
        aria-label='sidebar navigation'
        {...properties}
      >
        {(item) => {
          return item.items && item.items?.length > 0 ? (
            <ListboxSection
              key={item.key}
              classNames={sectionClasses}
              showDivider={isCompact}
              title={item.title}
            >
              {item.items.map((element) => renderItem(element))}
            </ListboxSection>
          ) : (
            <>{renderItem(item)}</>
          );
        }}
      </Listbox>
    );
  }
);

Sidebar.displayName = 'Sidebar';

export default Sidebar;
