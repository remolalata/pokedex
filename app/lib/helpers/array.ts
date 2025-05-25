import { map } from 'lodash-es';
import { PokemonListItem, PokemonListItemWithId } from '@types';

export const parsePokemonListsToId = (pokemonLists: PokemonListItem[]): PokemonListItemWithId[] => {
  return map(pokemonLists, pokemon => {
    const id = pokemon.url.split('/').filter(Boolean).pop();
    return {
      name: pokemon.name,
      id: Number(id),
    };
  });
};
