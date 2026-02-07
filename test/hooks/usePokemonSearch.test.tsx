import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { usePokemonSearch } from '../../app/hooks/usePokemonSearch';
import { buildPokemon } from '../fixtures/pokemon';

const fetchPokemonMock = vi.fn();

vi.mock('@api', () => ({
  fetchPokemon: (...args: unknown[]) => fetchPokemonMock(...args),
}));

describe('usePokemonSearch', () => {
  beforeEach(() => {
    fetchPokemonMock.mockReset();
  });

  it('resets list for empty query without calling API', async () => {
    const initial = [buildPokemon()];
    const { result } = renderHook(() => usePokemonSearch(initial));

    await act(async () => {
      await result.current.handleSearch('   ');
    });

    expect(fetchPokemonMock).not.toHaveBeenCalled();
    expect(result.current.pokemons).toEqual(initial);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('returns searched pokemon when API succeeds', async () => {
    const initial = [buildPokemon()];
    const charizard = buildPokemon({ id: 6, name: 'charizard' });
    fetchPokemonMock.mockResolvedValue(charizard);

    const { result } = renderHook(() => usePokemonSearch(initial));

    await act(async () => {
      await result.current.handleSearch('  Charizard  ');
    });

    expect(fetchPokemonMock).toHaveBeenCalledWith('charizard');
    await waitFor(() => {
      expect(result.current.pokemons).toEqual([charizard]);
    });
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('sets error and empties list when API fails', async () => {
    const initial = [buildPokemon()];
    fetchPokemonMock.mockRejectedValue(new Error('Not found'));

    const { result } = renderHook(() => usePokemonSearch(initial));

    await act(async () => {
      await result.current.handleSearch('missingno');
    });

    await waitFor(() => {
      expect(result.current.error).toBe('Not found');
    });
    expect(result.current.pokemons).toEqual([]);
    expect(result.current.loading).toBe(false);
  });
});
