import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://manuelgerstner.github.io',
  integrations: [tailwind()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'pt', 'fr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
