import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    include: ['test/**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@': path.resolve(rootDir, '.'),
      '@api': path.resolve(rootDir, 'app/lib/api/index.ts'),
      '@api/*': path.resolve(rootDir, 'app/lib/api/*'),
      '@components': path.resolve(rootDir, 'app/components/index.ts'),
      '@components/*': path.resolve(rootDir, 'app/components/*'),
      '@config': path.resolve(rootDir, 'app/lib/config/index.ts'),
      '@config/*': path.resolve(rootDir, 'app/lib/config/*'),
      '@constants': path.resolve(rootDir, 'app/lib/constants/index.ts'),
      '@constants/*': path.resolve(rootDir, 'app/lib/constants/*'),
      '@helpers': path.resolve(rootDir, 'app/lib/helpers/index.ts'),
      '@helpers/*': path.resolve(rootDir, 'app/lib/helpers/*'),
      '@types': path.resolve(rootDir, 'app/lib/types/index.ts'),
      '@types/*': path.resolve(rootDir, 'app/lib/types/*'),
    },
  },
});
