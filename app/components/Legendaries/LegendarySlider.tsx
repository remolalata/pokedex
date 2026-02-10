'use client';

import { getImage } from '@/app/lib/helpers';
import { PokemonDetail } from '@types';
import Image from 'next/image';
import { useRef } from 'react';

interface LegendarySliderProps {
  pokemons: PokemonDetail[];
}

export const LegendarySlider = ({ pokemons }: LegendarySliderProps) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByItem = (direction: 'prev' | 'next') => {
    const track = trackRef.current;

    if (!track) return;

    const firstItem = track.firstElementChild as HTMLElement | null;
    const amount = firstItem?.offsetWidth ?? 0;

    track.scrollBy({
      left: direction === 'next' ? amount : -amount,
      behavior: 'smooth',
    });
  };

  return (
    <div className='relative mt-8'>
      <button
        type='button'
        aria-label='Previous legendary'
        onClick={() => scrollByItem('prev')}
        className='absolute top-1/2 -left-4 md:-left-12 z-10 -translate-y-1/2 rounded-full bg-brand-dark text-white w-10 h-10 md:w-14 md:h-14 text-2xl md:text-4xl leading-none flex items-center justify-center'
      >
        {'<'}
      </button>
      <button
        type='button'
        aria-label='Next legendary'
        onClick={() => scrollByItem('next')}
        className='absolute top-1/2 -right-4 md:-right-12 z-10 -translate-y-1/2 rounded-full bg-brand-dark text-white w-10 h-10 md:w-14 md:h-14 text-2xl md:text-4xl leading-none flex items-center justify-center'
      >
        {'>'}
      </button>

      <div ref={trackRef} className='overflow-x-auto scrollbar-hide snap-x snap-mandatory'>
        <div className='grid min-w-full grid-flow-col auto-cols-[33.333%] gap-2 md:auto-cols-[16.666%]'>
          {pokemons.map((pokemon, index) => (
            <div key={pokemon.id} className='relative aspect-square w-full snap-start'>
              <Image
                src={getImage(pokemon)}
                alt={pokemon.name}
                fill
                className='object-contain'
                loading={index < 6 ? 'eager' : 'lazy'}
                priority={index < 3}
                sizes='(min-width: 768px) 16vw, 33vw'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
