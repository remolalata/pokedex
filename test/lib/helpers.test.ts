import { describe, expect, it } from 'vitest';
import { getBattlePower, parsePokemonListsToId } from '../../app/lib/helpers/array';
import { getImage, getPokemonMetrics } from '../../app/lib/helpers/object';
import { buildPokemon } from '../fixtures/pokemon';

describe('helpers', () => {
  it('parsePokemonListsToId extracts numeric ids from urls', () => {
    const result = parsePokemonListsToId([
      { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      { name: 'mewtwo', url: 'https://pokeapi.co/api/v2/pokemon/150/' },
    ]);

    expect(result).toEqual([
      { name: 'pikachu', id: 25 },
      { name: 'mewtwo', id: 150 },
    ]);
  });

  it('getBattlePower returns rounded average base stat', () => {
    const pokemon = buildPokemon();
    expect(getBattlePower(pokemon.stats)).toBe(43);
  });

  it('getImage prefers dream_world image with fallback', () => {
    const pokemon = buildPokemon();
    expect(getImage(pokemon)).toContain('dream-world/25.svg');

    const noDreamWorld = buildPokemon({
      sprites: {
        ...pokemon.sprites,
        other: {},
      },
    });
    expect(getImage(noDreamWorld)).toContain('/sprites/pokemon/25.png');
  });

  it('getPokemonMetrics extracts hp and experience with dynamic default max values', () => {
    const pokemon = buildPokemon({
      base_experience: 240,
      stats: [
        { base_stat: 78, effort: 0, stat: { name: 'hp', url: '' } },
        { base_stat: 84, effort: 0, stat: { name: 'attack', url: '' } },
      ],
    });

    expect(getPokemonMetrics(pokemon)).toEqual({
      hp: 78,
      experience: 240,
      hpMax: 128,
      experienceMax: 290,
    });
  });

  it('getPokemonMetrics supports max value placeholders via options', () => {
    const pokemon = buildPokemon();

    expect(getPokemonMetrics(pokemon, { hpMax: 300, experienceMax: 600 })).toMatchObject({
      hpMax: 300,
      experienceMax: 600,
    });
  });
});
