'use client';

import Image from 'next/image';

interface ErrorProps {
  message?: string;
}

export const SearchError = ({ message }: ErrorProps) => {
  return (
    <div className='flex flex-col items-center justify-center text-center my-10'>
      <Image
        src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png'
        alt='Sad Psyduck'
        width={80}
        height={80}
        className='mb-4 opacity-80'
      />
      <h2 className='text-lg font-semibold text-red-600'>Oh no! Something went wrong.</h2>
      <p className='text-sm text-gray-600 mt-1'>
        {message || 'We couldn’t catch that Pokémon. Try again!'}
      </p>
    </div>
  );
};
