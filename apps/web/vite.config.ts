import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

import { findSafePort, formatPortFallback } from './scripts/sonda-porta';

const isAnalyze = process.env.ANALYZE === 'true';

// Porta nomeada: 5210, fora das faixas de incremento do Vite (5173-5175 e
// 4173-4175). Antes o script raiz passava `--port 5173`, e `--port` na linha de
// comando PREVALECE sobre o config — entao a sonda deste arquivo era decorativa
// enquanto o numero morasse no script. Ele saiu de la para ca.
const DEV_PORT = Number(process.env.PORT) || 5210;

export default defineConfig(async ({ command }) => {
  // No build a porta nao existe, e a CI roda build.
  const devPort =
    command === 'serve' ? await findSafePort(DEV_PORT, { rotulo: 'nebula' }) : DEV_PORT;
  if (devPort !== DEV_PORT) console.warn(formatPortFallback(DEV_PORT, devPort, 'nebula'));

  return {
    base: '/nebula/',
    server: {
      host: '127.0.0.1',
      port: devPort,
      strictPort: true,
    },
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
  };
});
