'use client';

import { useDebouncedCallback } from '@/app/hooks';
import { usePokemonAutocomplete } from '@/app/hooks';
import { map, trim } from 'lodash-es';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
}

export const Search = ({ onSearch }: SearchProps) => {
  const t = useTranslations('Search');
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const debouncedSearch = useDebouncedCallback(onSearch, 500);
  const { suggestions, loading } = usePokemonAutocomplete(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setIsOpen(true);
    debouncedSearch(newValue);
  };

  const handleSelect = (name: string) => {
    setValue(name);
    setIsOpen(false);
    debouncedSearch.cancel();
    onSearch(name);
  };

  const handleClear = () => {
    setValue('');
    setIsOpen(false);
    debouncedSearch.cancel();
    onSearch('');
  };

  return (
    <div className='flex justify-center'>
      <div className='relative w-full md:max-w-2xs my-6'>
        <input
          type='text'
          placeholder={t('placeholder')}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 100)}
          className='bg-white shadow-md p-2 pl-4 pr-10 rounded-full focus:outline-0 w-full text-sm'
        />
        {trim(value).length > 0 && (
          <button
            type='button'
            aria-label='Clear search'
            onMouseDown={e => e.preventDefault()}
            onClick={handleClear}
            className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-800 cursor-pointer'
          >
            <X size={16} />
          </button>
        )}
        {isOpen && trim(value).length > 0 && (loading || suggestions.length > 0) && (
          <ul className='absolute z-20 mt-2 w-full bg-white rounded-2xl shadow-md p-1.5 max-h-44 overflow-auto'>
            {loading && <li className='px-2 py-1.5 text-xs text-gray-500'>{t('loadingSuggestions')}</li>}
            {map(suggestions, suggestion => (
              <li key={suggestion.name}>
                <button
                  type='button'
                  onMouseDown={() => handleSelect(suggestion.name)}
                  className='w-full text-left px-2 py-1.5 rounded-lg hover:bg-brand-gray capitalize flex items-center gap-1.5 text-xs'
                >
                  <Image src={suggestion.image} alt='' width={16} height={16} />
                  <span>{suggestion.name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
