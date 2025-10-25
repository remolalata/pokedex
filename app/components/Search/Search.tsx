'use client';

import { SEARCH_PLACEHOLDER } from '@/app/lib/config';
import { debounce } from 'lodash-es';
import { useMemo, useState, useEffect } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
}

export const Search = ({ onSearch }: SearchProps) => {
  const [value, setValue] = useState('');

  const debouncedSearch = useMemo(
    () =>
      debounce((q: string) => {
        onSearch(q);
      }, 500),
    [onSearch]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSearch(newValue);
  };

  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder={SEARCH_PLACEHOLDER}
        value={value}
        onChange={handleChange}
        className="w-full md:max-w-2xs my-6 text-sm bg-white p-2 px-4 rounded-full shadow-md focus:outline-0"
      />
    </div>
  );
};
