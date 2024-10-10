'use client';

import React from 'react';

import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Tooltip } from '@nextui-org/react';
import { Laptop, MoonStar, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <Dropdown className='min-w-32'>
      <DropdownTrigger>
        <Button data-testid='theme-toggle' variant='light' isIconOnly>
          <Sun
            className='rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'
            width={24}
          />
          <MoonStar
            className='absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100'
            width={24}
          />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu data-testid='theme-dropdown-content'>
        <DropdownItem data-testid='theme-light' onClick={() => setTheme('light')}>
          <div className='flex items-center'>
            <Sun className='mr-2 h-[1.2rem] w-[1.2rem]' />
            <span>Light</span>
          </div>
        </DropdownItem>
        <DropdownItem data-testid='theme-dark' onClick={() => setTheme('dark')}>
          <div className='flex items-center'>
            <MoonStar className='mr-2 h-[1.2rem] w-[1.2rem]' />
            <span>Dark</span>
          </div>
        </DropdownItem>
        <DropdownItem data-testid='theme-system' onClick={() => setTheme('system')}>
          <div className='flex items-center'>
            <Laptop className='mr-2 h-[1.2rem] w-[1.2rem]' />
            <span>System</span>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
