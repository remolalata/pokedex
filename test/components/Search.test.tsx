import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Search } from '../../app/components/Search/Search';

describe('Search', () => {
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
});
