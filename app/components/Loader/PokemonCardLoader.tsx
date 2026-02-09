'use client';

import { useTranslations } from 'next-intl';

export const PokemonCardLoader = () => {
  const t = useTranslations('Loader');

  return (
    <div className='flex flex-col items-center justify-center my-10'>
      <div className='relative w-16 h-16 animate-spin-slow'>
        <div className='absolute inset-0 rounded-full border-[6px] border-black bg-white' />
        <div className='absolute top-0 left-0 w-full h-1/2 rounded-t-full bg-red-500 border-b-[6px] border-black' />
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='w-6 h-6 bg-white border-[4px] border-black rounded-full'></div>
        </div>
      </div>
      <p className='mt-4 text-gray-600 text-sm font-medium'>{t('loadingPokemon')}</p>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 1.8s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};
