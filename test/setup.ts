import '@testing-library/jest-dom/vitest';
import React from 'react';
import { vi } from 'vitest';

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const { src, alt, fill, priority, ...rest } = props;

    return React.createElement('img', {
      src: typeof src === 'string' ? src : '',
      alt: typeof alt === 'string' ? alt : '',
      ...rest,
    });
  },
}));

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string | { pathname?: string };
    children: React.ReactNode;
  }) => {
    const resolvedHref = typeof href === 'string' ? href : href?.pathname || '';
    return React.createElement('a', { href: resolvedHref, ...rest }, children);
  },
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({
    href,
    children,
    ...rest
  }: {
    href: string | { pathname?: string };
    children: React.ReactNode;
  }) => {
    const resolvedHref = typeof href === 'string' ? href : href?.pathname || '';
    return React.createElement('a', { href: resolvedHref, ...rest }, children);
  },
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/',
  getPathname: vi.fn(),
  redirect: vi.fn(),
}));

vi.mock('next-intl', () => {
  const dictionary: Record<string, string> = {
    'Search.placeholder': 'Search Pokemon...',
    'Search.loadingSuggestions': 'Loading suggestions...',
    'Pokedex.empty': 'No Pokémon found.',
    'Modal.close': 'Close modal',
  };

  return {
    useLocale: () => 'en',
    useTranslations: (namespace?: string) => {
      const t = ((key: string) => {
        const dictKey = namespace ? `${namespace}.${key}` : key;
        return dictionary[dictKey] || dictKey;
      }) as ((key: string) => string) & {
        rich: (key: string, values?: Record<string, (chunks: React.ReactNode) => React.ReactNode>) => React.ReactNode;
      };

      t.rich = (key: string, values?: Record<string, (chunks: React.ReactNode) => React.ReactNode>) => {
        const raw = t(key);
        if (!values?.strong) {
          return raw;
        }

        const segments = raw.split(/<strong>|<\/strong>/g);
        return segments.map((segment, index) => (index % 2 === 1 ? values.strong(segment) : segment));
      };

      return t;
    },
  };
});
