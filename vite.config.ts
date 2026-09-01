import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    // Sin límites de aviso artificiales: el chunk de Spline es enorme por
    // naturaleza, pero ya está aislado y sólo se descarga bajo demanda.
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        // Separa las librerías pesadas del código de la app para que el
        // navegador pueda cachearlas y descargar sólo lo necesario al inicio.
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react'],
          email: ['@emailjs/browser'],
        },
      },
    },
  },
});
