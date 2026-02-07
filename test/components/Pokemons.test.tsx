import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Pokemons } from '../../app/components/Pokemons/Pokemons';
import { buildPokemon } from '../fixtures/pokemon';

const usePokemonSearchMock = vi.fn();

vi.mock('@/app/hooks', async importOriginal => {
  const actual = await importOriginal<typeof import('@/app/hooks')>();

  return {
    ...actual,
    usePokemonSearch: (...args: unknown[]) => usePokemonSearchMock(...args),
  };
});

describe('Pokemons', () => {
  it('renders empty state when no pokemon matches search', () => {
    usePokemonSearchMock.mockReturnValue({
      pokemons: [],
      loading: false,
      error: null,
      handleSearch: vi.fn(),
    });

    render(<Pokemons pokemons={[buildPokemon()]} />);

    expect(screen.getByText('No Pokémon found.')).toBeInTheDocument();
  });
});
