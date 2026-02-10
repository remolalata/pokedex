import { PokemonListResponse, PokemonListItemWithId, PokemonDetail } from '@types';
import { endpoints } from './endpoints';
import { compact, find, map } from 'lodash-es';
import { famousPokemons, legendaryPokemons } from '@constants';

type AbilityEffectEntry = {
  effect: string;
  short_effect: string;
  language: {
    name: string;
  };
};

type AbilityResponse = {
  effect_entries: AbilityEffectEntry[];
};

const normalizeAbilityDescription = (description: string) =>
  description.replaceAll('\n', ' ').replaceAll('\f', ' ').replace(/\s+/g, ' ').trim();

export const fetchPokemonList = async (limit = 20, offset = 0): Promise<PokemonListResponse> => {
  const res = await fetch(endpoints.listPokemons(limit, offset));

  if (!res.ok) throw new Error('Failed to fetch Pokémon list');

  const data = await res.json();

  return data;
};

export const fetchPokemon = async (nameOrId: string | number): Promise<PokemonDetail> => {
  const res = await fetch(endpoints.getPokemon(nameOrId));

  if (!res.ok) throw new Error(`Failed to fetch Pokémon with id or name: ${nameOrId}`);

  const data: PokemonDetail = await res.json();

  const enrichedAbilities = await Promise.allSettled(
    map(data.abilities, async pokemonAbility => {
      const abilityRes = await fetch(pokemonAbility.ability.url);

      if (!abilityRes.ok) return pokemonAbility;

      const abilityData: AbilityResponse = await abilityRes.json();
      const englishEffect = find(
        abilityData.effect_entries,
        effectEntry => effectEntry.language.name === 'en',
      );

      return {
        ...pokemonAbility,
        description: englishEffect
          ? normalizeAbilityDescription(englishEffect.short_effect || englishEffect.effect)
          : undefined,
      };
    }),
  );

  data.abilities = map(enrichedAbilities, (result, index) =>
    result.status === 'fulfilled' ? result.value : data.abilities[index],
  );

  return data;
};

export const fetchPokemonListsDetails = async (
  results: PokemonListItemWithId[],
): Promise<PokemonDetail[]> => {
  const pokemonData = await Promise.allSettled(
    map(results, async pokemon => {
      const res = await fetch(endpoints.getPokemon(pokemon.id));

      if (!res.ok) throw new Error(`Failed to fetch ${pokemon.name}`);

      return res.json();
    }),
  );

  return compact(
    map(pokemonData, result => (result.status === 'fulfilled' ? result.value : undefined)),
  );
};

export const fetchFamousPokemons = async (): Promise<PokemonDetail[]> => {
  const pokemonData = await Promise.allSettled(
    map(famousPokemons, async pokemon => {
      const res = await fetch(endpoints.getPokemon(pokemon));

      if (!res.ok) throw new Error(`Failed to fetch ${pokemon}`);

      return res.json();
    }),
  );

  return compact(
    map(pokemonData, result => (result.status === 'fulfilled' ? result.value : undefined)),
  );
};

export const fetchLegendaryPokemons = async (): Promise<PokemonDetail[]> => {
  const pokemonData = await Promise.allSettled(
    map(legendaryPokemons, async pokemon => {
      const res = await fetch(endpoints.getPokemon(pokemon));

      if (!res.ok) throw new Error(`Failed to fetch ${pokemon}`);

      return res.json();
    }),
  );

  return compact(
    map(pokemonData, result => (result.status === 'fulfilled' ? result.value : undefined)),
  );
};
