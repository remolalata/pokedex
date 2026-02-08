import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { PokemonMetric } from '../../app/components/Pokemons/PokemonMetric/PokemonMetric';

describe('PokemonMetric', () => {
  it('renders label, value, and clamped progress width', () => {
    const { rerender } = render(
      <PokemonMetric label='Health Points' value={128} maxValue={255} barColorClass='bg-green-500' />,
    );

    expect(screen.getByText('Health Points')).toBeInTheDocument();
    expect(screen.getByText('128')).toBeInTheDocument();

    const progress = screen.getByLabelText('Health Points progress');
    expect(progress).toHaveClass('bg-green-500');
    expect(progress).toHaveStyle({ width: '50.19607843137255%' });

    rerender(
      <PokemonMetric label='Health Points' value={999} maxValue={255} barColorClass='bg-green-500' />,
    );

    expect(screen.getByLabelText('Health Points progress')).toHaveStyle({ width: '100%' });
  });
});
