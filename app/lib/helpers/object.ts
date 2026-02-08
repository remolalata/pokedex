import { PokemonDetail } from '@types';
import { find } from 'lodash-es';

interface PokemonMetricMaxOptions {
  hpMax?: number;
  experienceMax?: number;
}

interface PokemonMetrics {
  hp: number;
  experience: number;
  hpMax: number;
  experienceMax: number;
}

export const getImage = (pokemon: PokemonDetail): string => {
  const fallbackImage =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';

  if (!pokemon) return fallbackImage;

  return (
    pokemon?.sprites?.other?.dream_world?.front_default ??
    pokemon?.sprites?.front_default ??
    fallbackImage
  );
};

export const getPokemonMetrics = (
  pokemon: PokemonDetail,
  options: PokemonMetricMaxOptions = {},
): PokemonMetrics => {
  const hp = find(pokemon.stats, stat => stat.stat.name === 'hp')?.base_stat || 0;
  const experience = pokemon.base_experience || 0;

  return {
    hp,
    experience,
    hpMax: options.hpMax ?? hp + 50,
    experienceMax: options.experienceMax ?? experience + 50,
  };
};
