import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      { protocol: 'https', hostname: 'pokeapi.co' },
      { protocol: 'https', hostname: 'img.pokemondb.net' },
    ],
  },
};

export default withNextIntl(nextConfig);
