import { PokemonDetail } from '@types';

export const buildPokemon = (overrides: Partial<PokemonDetail> = {}): PokemonDetail => {
  return {
    id: 25,
    name: 'pikachu',
    base_experience: 112,
    height: 4,
    weight: 60,
    order: 35,
    is_default: true,
    location_area_encounters: '',
    abilities: [
      {
        ability: { name: 'static', url: 'https://pokeapi.co/api/v2/ability/9/' },
        is_hidden: false,
        slot: 1,
      },
    ],
    cries: { latest: '', legacy: '' },
    forms: [{ name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon-form/25/' }],
    game_indices: [],
    held_items: [],
    moves: [],
    past_abilities: [],
    past_types: [],
    species: { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon-species/25/' },
    sprites: {
      back_default: null,
      back_female: null,
      back_shiny: null,
      back_shiny_female: null,
      front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      front_female: null,
      front_shiny: null,
      front_shiny_female: null,
      other: {
        dream_world: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg',
          front_female: null,
        },
      },
    },
    stats: [
      { base_stat: 35, effort: 0, stat: { name: 'hp', url: '' } },
      { base_stat: 55, effort: 0, stat: { name: 'attack', url: '' } },
      { base_stat: 40, effort: 0, stat: { name: 'defense', url: '' } },
    ],
    types: [
      { slot: 1, type: { name: 'electric', url: '' } },
      { slot: 2, type: { name: 'normal', url: '' } },
    ],
    ...overrides,
  };
};
