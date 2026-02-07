'use client';

import { useDebouncedCallback } from '@/app/hooks';
import { SEARCH_PLACEHOLDER } from '@/app/lib/config';
import { useState } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
}

export const Search = ({ onSearch }: SearchProps) => {
  const [value, setValue] = useState('');

  const debouncedSearch = useDebouncedCallback(onSearch, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSearch(newValue);
  };

  return (
    <div className='flex justify-center'>
      <input
        type='text'
        placeholder={SEARCH_PLACEHOLDER}
        value={value}
        onChange={handleChange}
        className='bg-white shadow-md my-6 p-2 px-4 rounded-full focus:outline-0 w-full md:max-w-2xs text-sm'
      />
    </div>
  );
};
