import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  base: '/nebula/',
  plugins: [react(), glsl(), tailwindcss()],
  build: {
    target: 'es2022',
  },
});
