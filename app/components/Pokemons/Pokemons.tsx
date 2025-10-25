'use client';

import { fetchPokemon } from '@/app/lib/api';
import { PokemonCard, PokemonCardLoader, Search, SearchError } from '@components';
import { PokemonDetail } from '@types';
import { map } from 'lodash-es';
import { useState } from 'react';

interface PokemonsProps {
  pokemons: PokemonDetail[];
}

export const Pokemons = ({ pokemons: _pokemons }: PokemonsProps) => {
  const [pokemons, setPokemons] = useState<PokemonDetail[]>(_pokemons);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setPokemons(_pokemons);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const pokemon = await fetchPokemon(query.trim().toLowerCase());
      setPokemons([pokemon]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setPokemons([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className='text-2xl md:text-4xl font-medium text-center'>
        800 <span className='font-bold'>Pokemons</span> for you to choose your favorite
      </h1>

      <Search onSearch={handleSearch} />

      {loading && <PokemonCardLoader />}
      {error && <SearchError message={error} />}

      {!loading && !error && pokemons.length === 0 && (
        <p className='text-center text-gray-600 mt-8'>No Pokémon found.</p>
      )}

      {!loading && !error && pokemons.length > 0 && (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-6 md:gap-y-6 lg:gap-x-8 lg:gap-y-8'>
          {map(pokemons, (pokemon, index) => (
            <PokemonCard key={index} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
};
