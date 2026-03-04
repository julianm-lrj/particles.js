import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: { index: 'src/index.js' },
    format: ['esm', 'cjs'],
    outDir: 'dist',
    sourcemap: true,
    clean: true,
    dts: false,
    outExtension({ format }) {
      if (format === 'esm') return { js: '.mjs' };
      if (format === 'cjs') return { js: '.cjs' };
      return { js: '.js' };
    },
  },
  {
    entry: { 'particles.min': 'src/index.js' },
    format: ['iife'],
    outDir: 'dist',
    minify: true,
    sourcemap: true,
    outExtension() {
      return { js: '.js' };
    },
  },
]);
