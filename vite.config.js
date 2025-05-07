import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: './dist/stats.html', // Specifica il percorso e il nome del file
      open: true,                    // Apri automaticamente il report nel browser
      template: 'treemap',           // Tipo di visualizzazione: 'treemap', 'sunburst', 'network'
      gzipSize: true,                // Mostra le dimensioni gzip
      brotliSize: true               // Mostra le dimensioni brotli
    })
  ],
  base: './',
  optimizeDeps: {
    include: ['@mui/x-data-grid'],
  },
});
