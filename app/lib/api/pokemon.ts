import { PokemonListResponse, PokemonListItemWithId, PokemonDetail } from '@types';
import { endpoints } from './endpoints';
import { map } from 'lodash-es';
import { famousPokemons } from '@constants';

export const fetchPokemonList = async (limit = 20, offset = 0): Promise<PokemonListResponse> => {
  const res = await fetch(endpoints.listPokemons(limit, offset));

  if (!res.ok) throw new Error('Failed to fetch Pokémon list');

  const data = await res.json();

  return data;
};

export const fetchPokemon = async (nameOrId: string | number) => {
  const res = await fetch(endpoints.getPokemon(nameOrId));

  if (!res.ok) throw new Error(`Failed to fetch Pokémon with id or name: ${nameOrId}`);

  const data = await res.json();

  return data;
};

export const fetchPokemonListsDetails = async (
  results: PokemonListItemWithId[],
): Promise<PokemonDetail[]> => {
  const pokemonData = await Promise.all(
    map(results, async pokemon => {
      const res = await fetch(endpoints.getPokemon(pokemon.id));

      if (!res.ok) throw new Error(`Failed to fetch ${pokemon.name}`);

      return res.json();
    }),
  );

  return pokemonData;
};

export const fetchFamousPokemons = async (): Promise<PokemonDetail[]> => {
  const pokemonData = await Promise.all(
    map(famousPokemons, async pokemon => {
      const res = await fetch(endpoints.getPokemon(pokemon));

      if (!res.ok) throw new Error(`Failed to fetch ${pokemon}`);

      return res.json();
    }),
  );

  return pokemonData;
};