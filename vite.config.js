import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Honour PORT so a second instance can run alongside one already on 5173.
    port: Number(process.env.PORT) || 5173,
    strictPort: Boolean(process.env.PORT),
    open: true,
  },
});
