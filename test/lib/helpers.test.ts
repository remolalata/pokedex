import { describe, expect, it } from 'vitest';
import { getBattlePower, parsePokemonListsToId } from '../../app/lib/helpers/array';
import { getImage } from '../../app/lib/helpers/object';
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
});
