import { PokemonListItem, PokemonListItemWithId } from '@types';
import { map } from 'lodash-es';

export const parsePokemonListsToId = (pokemonLists: PokemonListItem[]): PokemonListItemWithId[] => {
  return map(pokemonLists, pokemon => {
    const id = pokemon.url.split('/').filter(Boolean).pop();
    return {
      name: pokemon.name,
      id: Number(id),
    };
  });
};