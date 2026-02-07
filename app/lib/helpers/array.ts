import { PokemonListItem, PokemonListItemWithId, PokemonStat } from '@types';
import { map, meanBy, round } from 'lodash-es';

export const parsePokemonListsToId = (pokemonLists: PokemonListItem[]): PokemonListItemWithId[] => {
  return map(pokemonLists, pokemon => {
    const id = pokemon.url.split('/').filter(Boolean).pop();
    return {
      name: pokemon.name,
      id: Number(id),
    };
  });
};

export const getBattlePower = (stats: PokemonStat[]): number => {
  if (!stats?.length) return 0;

  return round(meanBy(stats, 'base_stat'));
};