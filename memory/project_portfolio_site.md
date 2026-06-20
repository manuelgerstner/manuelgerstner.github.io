---
name: portfolio-site
description: Astro portfolio site for Manuel Gerstner — structure, tech choices, deployment
metadata:
  type: project
---

Astro 4.x portfolio site at `/Users/manu/dev/mgerstner-page`, targeting GitHub Pages at `https://manuelgerstner.github.io`.

**Why:** Personal portfolio + blog with multilingual support (EN default, DE, PT).

**Stack:** Astro 4 · Tailwind CSS · @tailwindcss/typography · TypeScript content collections.

**i18n routing:** `prefixDefaultLocale: false` → EN at `/`, DE at `/de/`, PT at `/pt/`.

**Content:** 2 blog posts per language (en/de/pt) in `src/content/blog/{lang}/`. Portfolio data in `src/data/portfolio.ts` (fully translated for all 3 langs). UI strings in `src/i18n/translations.ts`.

**Key components:** `HomePage.astro` (shared, lang prop), `BlogListPage.astro` (shared), `Header.astro`, `Footer.astro`, `LanguageSwitcher.astro`.

**Deployment:** `.github/workflows/deploy.yml` using `actions/deploy-pages@v4`. Repo: `manuelgerstner/manuelgerstner.github.io`.

**CV:** `public/cv.pdf` (copied from source PDF). Linked from hero CTA.

**How to apply:** When working on this project, check `src/i18n/translations.ts` for UI strings and `src/data/portfolio.ts` for structured content. Adding a new blog post = new `.md` file in `src/content/blog/{lang}/` with correct frontmatter (title, description, pubDate, lang).
