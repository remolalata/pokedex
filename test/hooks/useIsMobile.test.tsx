import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useIsMobile } from '../../app/hooks/useIsMobile';

describe('useIsMobile', () => {
  it('returns media query match state', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation(() => ({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );

    const { result } = renderHook(() => useIsMobile(768));
    expect(result.current).toBe(true);
  });
});
