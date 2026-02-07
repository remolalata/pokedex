import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { useDebouncedCallback } from '../../app/hooks/useDebouncedCallback';

describe('useDebouncedCallback', () => {
  it('calls callback once with latest args after delay', () => {
    vi.useFakeTimers();
    const callback = vi.fn();

    const { result } = renderHook(() => useDebouncedCallback(callback, 300));

    act(() => {
      result.current('first');
      result.current('second');
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('second');
    vi.useRealTimers();
  });
});
