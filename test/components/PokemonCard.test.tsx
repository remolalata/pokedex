import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { PokemonCard } from '../../app/components/Pokemons/PokemonCard/PokemonCard';
import { buildPokemon } from '../fixtures/pokemon';

describe('PokemonCard', () => {
  it('renders pokemon info and links to pokemon route', () => {
    const pokemon = buildPokemon();
    render(<PokemonCard pokemon={pokemon} />);

    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('attack')).toBeInTheDocument();
    expect(screen.getByText('defense')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/pokemon/pikachu');
  });
});
