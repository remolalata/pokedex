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
  const hp = find(pokemon.stats, stat => stat.stat.name === 'hp')?.base_stat || 0;
  const experience = pokemon.base_experience || 0;

  return {
    hp,
    experience,
    hpMax: options.hpMax ?? hp + 50,
    experienceMax: options.experienceMax ?? experience + 50,
  };
};

export const getGradientFromHex = (hex: string) => {
  const light = adjustHexColor(hex, 28);
  const dark = adjustHexColor(hex, -22);

  return `radial-gradient(circle at center, ${light} 0%, ${hex} 52%, ${dark} 100%)`;
};
