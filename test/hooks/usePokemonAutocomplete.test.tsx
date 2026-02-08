import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  clearPokemonAutocompleteCache,
  usePokemonAutocomplete,
} from '../../app/hooks/usePokemonAutocomplete';

const fetchPokemonListMock = vi.fn();

vi.mock('@api', () => ({
  fetchPokemonList: (...args: unknown[]) => fetchPokemonListMock(...args),
}));

describe('usePokemonAutocomplete', () => {
  beforeEach(() => {
    fetchPokemonListMock.mockReset();
    clearPokemonAutocompleteCache();
  });

  it('does not fetch when query is below minimum chars', () => {
    renderHook(() => usePokemonAutocomplete('p', 6, 2));
    expect(fetchPokemonListMock).not.toHaveBeenCalled();
  });

  it('fetches suggestions from API and filters by query', async () => {
    fetchPokemonListMock.mockResolvedValue({
      count: 3,
      next: null,
      previous: null,
      results: [
        { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
        { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      ],
    });

    const { result } = renderHook(() => usePokemonAutocomplete('char'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(fetchPokemonListMock).toHaveBeenCalledWith(1300, 0);
    expect(result.current.suggestions).toEqual([
      {
        name: 'charizard',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg',
      },
      {
        name: 'charmander',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg',
      },
    ]);
  });
});
