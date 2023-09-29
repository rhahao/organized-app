import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'vwwffz',
  e2e: {
    baseUrl: 'http://localhost:4050',
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    video: false,
  },
});
