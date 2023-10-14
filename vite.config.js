import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { loadVersion } from '@sws2apps/vite-plugin-package-version';
import { comlink } from 'vite-plugin-comlink';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin(), comlink(), eslint({ useEslintrc: true }), loadVersion()],
  resolve: {
    alias: [
      { find: '@assets', replacement: resolve(__dirname, 'src/assets') },
      { find: '@components', replacement: resolve(__dirname, 'src/components') },
      { find: '@constants', replacement: resolve(__dirname, 'src/constants') },
      { find: '@features', replacement: resolve(__dirname, 'src/features') },
      { find: '@hooks', replacement: resolve(__dirname, 'src/hooks') },
      { find: '@layouts', replacement: resolve(__dirname, 'src/layouts') },
      { find: '@pages', replacement: resolve(__dirname, 'src/pages') },
      { find: '@routes', replacement: resolve(__dirname, 'src/routes') },
      { find: '@services', replacement: resolve(__dirname, 'src/services') },
      { find: '@states', replacement: resolve(__dirname, 'src/states') },
      { find: '@utils', replacement: resolve(__dirname, 'src/utils') },
      { find: '@wrapper', replacement: resolve(__dirname, 'src/wrapper') },
    ],
  },
  worker: { plugins: [comlink()] },
  server: {
    port: 4050,
    host: true,
  },
  preview: {
    port: 4050,
  },
  minifyInternalExports: true,
  build: {
    chunkSizeWarningLimit: 2500,
    target: 'esnext',
  },
});
