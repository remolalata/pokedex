'use client'

import { PokemonDetail } from '@types';
import { map } from 'lodash-es';
import { PokemonCard } from '@components';

interface PokemonsProps {
  pokemons: PokemonDetail[];
}

export const Pokemons = ({ pokemons = [] }: PokemonsProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-6 md:gap-y-6 lg:gap-x-8 lg:gap-y-8'>
      {map(pokemons, (pokemon, index) => (
        <PokemonCard key={index} pokemon={pokemon} />
      ))}
    </div>
  );
};
