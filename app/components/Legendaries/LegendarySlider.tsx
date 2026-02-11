'use client';

import { pokemonTypeHexColors } from '@/app/lib/constants';
import { getGradientFromHex, getImage } from '@/app/lib/helpers';
import { PokemonDetail } from '@types';
import Image from 'next/image';
import { useRef } from 'react';

interface LegendarySliderProps {
  pokemons: PokemonDetail[];
  selectedPokemonId?: number;
  onSelectPokemon?: (pokemon: PokemonDetail) => void;
}

export const LegendarySlider = ({
  pokemons,
  selectedPokemonId,
  onSelectPokemon,
}: LegendarySliderProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const electricColor = pokemonTypeHexColors.electric;
  const electricGradient = getGradientFromHex(electricColor);

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
    <div className='relative mt-14 md:mt-20 lg:mt-24'>
      <button
        type='button'
        aria-label='Previous legendary'
        onClick={() => scrollByItem('prev')}
        className='absolute top-1/2 -left-4 lg:-left-12 z-10 -translate-y-1/2 text-white w-10 h-10 lg:w-14 lg:h-14 text-2xl lg:text-4xl font-black leading-none hidden lg:flex items-center justify-center'
      >
        {'<'}
      </button>
      <button
        type='button'
        aria-label='Next legendary'
        onClick={() => scrollByItem('next')}
        className='absolute top-1/2 -right-4 lg:-right-12 z-10 -translate-y-1/2 text-white w-10 h-10 lg:w-14 lg:h-14 text-2xl lg:text-4xl font-black leading-none hidden lg:flex items-center justify-center'
      >
        {'>'}
      </button>

      <div ref={trackRef} className='overflow-x-auto scrollbar-hide snap-x snap-mandatory'>
        <div className='grid min-w-full grid-flow-col auto-cols-[33.333%] gap-0 md:auto-cols-[16.666%]'>
          {pokemons.map((pokemon, index) => (
            <div key={pokemon.id} className='w-full snap-start'>
              <button
                type='button'
                aria-label={`Select ${pokemon.name}`}
                aria-pressed={selectedPokemonId === pokemon.id}
                onClick={() => onSelectPokemon?.(pokemon)}
                className='relative block aspect-square w-full overflow-visible cursor-pointer'
              >
                <div
                  className='absolute inset-y-0 left-[16%] right-[16%] rounded-xl'
                  style={{ backgroundColor: electricColor, background: electricGradient }}
                />
                <div className='absolute inset-x-0 -top-1 bottom-6 z-30'>
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
                <div className='absolute left-[16%] right-[16%] bottom-0 z-20'>
                  <div className='bg-white px-2 py-1 text-center text-xs font-semibold capitalize text-brand-legendaries rounded-b-xl md:text-sm'>
                    {pokemon.name}
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
