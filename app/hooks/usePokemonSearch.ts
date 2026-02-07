'use client';

import { fetchPokemon } from '@api';
import { PokemonDetail } from '@types';
import { isEmpty, toLower, trim } from 'lodash-es';
import { useCallback, useEffect, useState } from 'react';

export const usePokemonSearch = (initialPokemons: PokemonDetail[]) => {
  const [pokemons, setPokemons] = useState<PokemonDetail[]>(initialPokemons);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPokemons(initialPokemons);
  }, [initialPokemons]);

  const handleSearch = useCallback(
    async (query: string) => {
      const normalizedQuery = toLower(trim(query));

      if (isEmpty(normalizedQuery)) {
        setPokemons(initialPokemons);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const pokemon = await fetchPokemon(normalizedQuery);
        setPokemons([pokemon]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setPokemons([]);
      } finally {
        setLoading(false);
      }
    },
    [initialPokemons],
  );

  return {
    pokemons,
    loading,
    error,
    handleSearch,
  };
};
