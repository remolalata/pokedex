'use client';

import { fetchPokemonList } from '@api';
import { filter, map, take, toLower, trim } from 'lodash-es';
import { useEffect, useState } from 'react';

export interface PokemonAutocompleteSuggestion {
  name: string;
  image: string;
}

interface PokemonAutocompleteItem {
  name: string;
  normalizedName: string;
  image: string;
}

let cachedPokemonAutocompleteItems: PokemonAutocompleteItem[] | null = null;
let pokemonAutocompleteItemsPromise: Promise<PokemonAutocompleteItem[]> | null = null;

const getPokemonSpriteById = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;

const getPokemonIdFromUrl = (url: string): number => {
  const parts = url.split('/').filter(Boolean);
  const id = Number(parts[parts.length - 1]);

  return Number.isFinite(id) ? id : 0;
};

const getPokemonAutocompleteItems = async (): Promise<PokemonAutocompleteItem[]> => {
  if (cachedPokemonAutocompleteItems) return cachedPokemonAutocompleteItems;
  if (pokemonAutocompleteItemsPromise) return pokemonAutocompleteItemsPromise;

  pokemonAutocompleteItemsPromise = fetchPokemonList(1300, 0)
    .then(data => {
      cachedPokemonAutocompleteItems = map(data.results, pokemon => {
        const id = getPokemonIdFromUrl(pokemon.url);

        return {
          name: pokemon.name,
          normalizedName: toLower(pokemon.name),
          image: getPokemonSpriteById(id),
        };
      });
      return cachedPokemonAutocompleteItems;
    })
    .finally(() => {
      pokemonAutocompleteItemsPromise = null;
    });

  return pokemonAutocompleteItemsPromise;
};

export const clearPokemonAutocompleteCache = () => {
  cachedPokemonAutocompleteItems = null;
  pokemonAutocompleteItemsPromise = null;
};

export const usePokemonAutocomplete = (query: string, maxSuggestions = 6, minChars = 2) => {
  const [suggestions, setSuggestions] = useState<PokemonAutocompleteSuggestion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const normalizedQuery = trim(toLower(query));

    if (normalizedQuery.length < minChars) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const run = async () => {
      setLoading(true);
      try {
        const pokemonAutocompleteItems = await getPokemonAutocompleteItems();
        if (cancelled) return;

        setSuggestions(
          take(
            map(
              filter(pokemonAutocompleteItems, pokemon =>
                pokemon.normalizedName.includes(normalizedQuery),
              ),
              pokemon => ({
                name: pokemon.name,
                image: pokemon.image,
              }),
            ),
            maxSuggestions,
          ),
        );
      } catch {
        if (!cancelled) setSuggestions([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [maxSuggestions, minChars, query]);

  return { suggestions, loading };
};
