import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://manuelgerstner.github.io',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'pt', 'fr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
