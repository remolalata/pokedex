'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface ErrorProps {
  message?: string;
}

export const SearchError = ({ message }: ErrorProps) => {
  const t = useTranslations('Error');

  return (
    <div className='flex flex-col items-center justify-center text-center my-10'>
      <Image
        src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png'
        alt={t('sadPsyduckAlt')}
        width={80}
        height={80}
        className='mb-4 opacity-80'
      />
      <h2 className='text-lg font-semibold text-red-600'>{t('title')}</h2>
      <p className='text-sm text-gray-600 mt-1'>{message || t('fallback')}</p>
    </div>
  );
};
