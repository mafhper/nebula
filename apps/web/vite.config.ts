import { visualizer } from 'rollup-plugin-visualizer';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

const isAnalyze = process.env.ANALYZE === 'true';

export default defineConfig({
  base: '/nebula/',
  plugins: [
    react(),
    glsl(),
    tailwindcss(),
    ...(isAnalyze
      ? [
          visualizer({
            filename: 'dist/bundle-analysis.html',
            open: false,
            gzipSize: true,
            brotliSize: true,
          }),
        ]
      : []),
  ],
  build: {
    target: 'es2022',
  },
});
