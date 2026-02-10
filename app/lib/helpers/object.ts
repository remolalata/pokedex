import { PokemonDetail } from '@types';
import { find } from 'lodash-es';

type PokemonMetricKey =
  | 'hp'
  | 'experience'
  | 'attack'
  | 'defense'
  | 'special-attack'
  | 'special-defense';

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

interface PokemonMetricOptions {
  maxValue?: number;
  maxValueOffset?: number;
}

interface PokemonMetricData {
  value: number;
  maxValue: number;
}

const normalizeHex = (hex: string) => {
  const trimmed = hex.replace('#', '').trim();

  if (trimmed.length === 3) {
    return trimmed
      .split('')
      .map(char => `${char}${char}`)
      .join('');
  }

  return trimmed.padEnd(6, '0').slice(0, 6);
};

const adjustHexColor = (hex: string, percent: number) => {
  const normalizedHex = normalizeHex(hex);
  const colorNumber = Number.parseInt(normalizedHex, 16);

  const r = Math.max(0, Math.min(255, ((colorNumber >> 16) & 0xff) + Math.round((255 * percent) / 100)));
  const g = Math.max(0, Math.min(255, ((colorNumber >> 8) & 0xff) + Math.round((255 * percent) / 100)));
  const b = Math.max(0, Math.min(255, (colorNumber & 0xff) + Math.round((255 * percent) / 100)));

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

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
  const hpMetric = getPokemonMetric(pokemon, 'hp', { maxValue: options.hpMax });
  const experienceMetric = getPokemonMetric(pokemon, 'experience', {
    maxValue: options.experienceMax,
  });

  return {
    hp: hpMetric.value,
    experience: experienceMetric.value,
    hpMax: hpMetric.maxValue,
    experienceMax: experienceMetric.maxValue,
  };
};

export const getPokemonMetric = (
  pokemon: PokemonDetail,
  key: PokemonMetricKey,
  options: PokemonMetricOptions = {},
): PokemonMetricData => {
  const maxValueOffset = options.maxValueOffset ?? 10;
  const value =
    key === 'experience'
      ? pokemon.base_experience || 0
      : find(pokemon.stats, stat => stat.stat.name === key)?.base_stat || 0;

  return {
    value,
    maxValue: options.maxValue ?? value + maxValueOffset,
  };
};

export const getGradientFromHex = (hex: string) => {
  const light = adjustHexColor(hex, 28);
  const dark = adjustHexColor(hex, -22);

  return `radial-gradient(circle at center, ${light} 0%, ${hex} 52%, ${dark} 100%)`;
};
