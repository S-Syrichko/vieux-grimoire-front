import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [path.resolve(__dirname, 'src/tests/setup.ts')],
    env: {
      IS_REACT_ACT_ENVIRONMENT: 'true',
    },
    include: ['./**/*.test.tsx'],
  },
 
});