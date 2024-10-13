'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search as SearchIcon } from 'lucide-react';
import React from 'react';

const Search = () => {
  return (
    <div className='flex items-center space-x-4'>
      <div className='relative flex-grow'>
        <Input type='text' placeholder='Search properties...' className='pl-10 pr-4 py-2 w-full' />
        <SearchIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
      </div>
      <Button>Search</Button>
    </div>
  );
};

export default Search;
