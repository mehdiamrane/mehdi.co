// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://mehdi.co',
  server: {
    allowedHosts: true
  },
  vite: {
    plugins: [tailwindcss()]
  }
});