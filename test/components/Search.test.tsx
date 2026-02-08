import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Search } from '../../app/components/Search/Search';

const usePokemonAutocompleteMock = vi.fn();

vi.mock('@/app/hooks', async importOriginal => {
  const actual = await importOriginal<typeof import('@/app/hooks')>();

  return {
    ...actual,
    usePokemonAutocomplete: (...args: unknown[]) => usePokemonAutocompleteMock(...args),
  };
});

describe('Search', () => {
  beforeEach(() => {
    usePokemonAutocompleteMock.mockReset();
    usePokemonAutocompleteMock.mockReturnValue({ suggestions: [], loading: false });
  });

  it('debounces search callback', () => {
    vi.useFakeTimers();
    const onSearch = vi.fn();

    render(<Search onSearch={onSearch} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'pikachu' } });

    expect(onSearch).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('pikachu');
    vi.useRealTimers();
  });

  it('shows autocomplete suggestions and selects one', () => {
    const onSearch = vi.fn();
    usePokemonAutocompleteMock.mockReturnValue({
      suggestions: [
        { name: 'charizard', image: 'https://example.com/charizard.svg' },
        { name: 'charmander', image: 'https://example.com/charmander.svg' },
      ],
      loading: false,
    });

    render(<Search onSearch={onSearch} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'char' } });

    expect(screen.getByRole('button', { name: 'charizard' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'charmander' })).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByRole('button', { name: 'charizard' }));

    expect(onSearch).toHaveBeenCalledWith('charizard');
  });
});
