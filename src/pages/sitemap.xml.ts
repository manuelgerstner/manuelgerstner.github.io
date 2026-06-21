import { getCollection } from 'astro:content';

const site = 'https://manuelgerstner.github.io';

const langs = ['en', 'de', 'pt', 'fr'] as const;

function langPrefix(lang: string) {
  return lang === 'en' ? '' : `/${lang}`;
}

interface UrlEntry {
  loc: string;
  lastmod?: string;
  alternates: { hreflang: string; href: string }[];
}

function homeAlternates() {
  return langs.map((l) => ({
    hreflang: l,
    href: `${site}${langPrefix(l)}/`,
  }));
}

function blogAlternates(slug: string) {
  return langs.map((l) => ({
    hreflang: l,
    href: `${site}${langPrefix(l)}/blog/${slug}/`,
  }));
}

function renderUrl(entry: UrlEntry) {
  const alts = entry.alternates
    .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>`)
    .join('\n');
  return `  <url>
    <loc>${entry.loc}</loc>${entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ''}
${alts}
  </url>`;
}

export async function GET() {
  const enPosts = await getCollection('blog', ({ id }) => id.startsWith('en/'));
  const blogSlugs = enPosts.map((p) => p.slug.replace(/^en\//, ''));

  const staticPages: UrlEntry[] = langs.map((l) => ({
    loc: `${site}${langPrefix(l)}/`,
    alternates: homeAlternates(),
  }));

  const blogListPages: UrlEntry[] = langs.map((l) => ({
    loc: `${site}${langPrefix(l)}/blog/`,
    alternates: langs.map((al) => ({
      hreflang: al,
      href: `${site}${langPrefix(al)}/blog/`,
    })),
  }));

  const blogPostPages: UrlEntry[] = blogSlugs.flatMap((slug) =>
    langs.map((l) => {
      const post = enPosts.find((p) => p.slug === `en/${slug}`);
      return {
        loc: `${site}${langPrefix(l)}/blog/${slug}/`,
        lastmod: post ? post.data.pubDate.toISOString().split('T')[0] : undefined,
        alternates: blogAlternates(slug),
      };
    })
  );

  const urls = [...staticPages, ...blogListPages, ...blogPostPages];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(renderUrl).join('\n')}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
