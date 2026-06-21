export const languages = {
  en: 'English',
  de: 'Deutsch',
  pt: 'Português',
  fr: 'Français',
} as const;

export const defaultLang = 'en' as const;
export type Lang = keyof typeof languages;

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'hero.badge': 'Software Engineer & Cloud Architect',
    'hero.cta.blog': 'Read Blog',
    'hero.cta.cv': 'Download CV',
    'hero.cta.contact': 'Get in Touch',
    'section.about': 'About Me',
    'section.skills': 'Core Competencies',
    'section.experience': 'Experience',
    'section.education': 'Education',
    'section.techstack': 'Technical Stack',
    'section.certifications': 'Certifications',
    'section.projects': 'Projects',
    'section.contact': 'Contact',
    'contact.email': 'Email',
    'contact.location': 'Location',
    'contact.phone.za': 'Phone (ZA)',
    'contact.phone.eu': 'Phone (EU)',
    'blog.title': 'Blog',
    'blog.subtitle': 'Articles on software engineering, cloud architecture, and geospatial technology.',
    'blog.readmore': 'Read more →',
    'blog.back': '← Back to Blog',
    'blog.published': 'Published on',
    'footer.rights': 'All rights reserved.',
    'footer.imprint': 'Imprint',
    'footer.privacy': 'Privacy',
  },
  de: {
    'nav.home': 'Start',
    'nav.blog': 'Blog',
    'hero.badge': 'Software-Entwickler & Cloud-Architekt',
    'hero.cta.blog': 'Blog lesen',
    'hero.cta.cv': 'Lebenslauf herunterladen',
    'hero.cta.contact': 'Kontakt aufnehmen',
    'section.about': 'Über Mich',
    'section.skills': 'Kernkompetenzen',
    'section.experience': 'Berufserfahrung',
    'section.education': 'Ausbildung',
    'section.techstack': 'Technischer Stack',
    'section.certifications': 'Zertifizierungen',
    'section.projects': 'Projekte',
    'section.contact': 'Kontakt',
    'contact.email': 'E-Mail',
    'contact.location': 'Standort',
    'contact.phone.za': 'Telefon (ZA)',
    'contact.phone.eu': 'Telefon (EU)',
    'blog.title': 'Blog',
    'blog.subtitle': 'Artikel über Software-Entwicklung, Cloud-Architektur und geospatiale Technologie.',
    'blog.readmore': 'Weiterlesen →',
    'blog.back': '← Zurück zum Blog',
    'blog.published': 'Veröffentlicht am',
    'footer.rights': 'Alle Rechte vorbehalten.',
    'footer.imprint': 'Impressum',
    'footer.privacy': 'Datenschutz',
  },
  pt: {
    'nav.home': 'Início',
    'nav.blog': 'Blog',
    'hero.badge': 'Engenheiro de Software & Arquiteto Cloud',
    'hero.cta.blog': 'Ler Blog',
    'hero.cta.cv': 'Baixar CV',
    'hero.cta.contact': 'Entrar em Contato',
    'section.about': 'Sobre Mim',
    'section.skills': 'Competências Principais',
    'section.experience': 'Experiência',
    'section.education': 'Educação',
    'section.techstack': 'Stack Técnica',
    'section.certifications': 'Certificações',
    'section.projects': 'Projetos',
    'section.contact': 'Contato',
    'contact.email': 'E-mail',
    'contact.location': 'Localização',
    'contact.phone.za': 'Telefone (ZA)',
    'contact.phone.eu': 'Telefone (EU)',
    'blog.title': 'Blog',
    'blog.subtitle': 'Artigos sobre engenharia de software, arquitetura cloud e tecnologia geoespacial.',
    'blog.readmore': 'Ler mais →',
    'blog.back': '← Voltar ao Blog',
    'blog.published': 'Publicado em',
    'footer.rights': 'Todos os direitos reservados.',
    'footer.imprint': 'Imprint',
    'footer.privacy': 'Privacy',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.blog': 'Blog',
    'hero.badge': 'Ingénieur Logiciel & Architecte Cloud',
    'hero.cta.blog': 'Lire le Blog',
    'hero.cta.cv': 'Télécharger le CV',
    'hero.cta.contact': 'Me Contacter',
    'section.about': 'À Propos',
    'section.skills': 'Compétences Clés',
    'section.experience': 'Expérience',
    'section.education': 'Formation',
    'section.techstack': 'Stack Technique',
    'section.certifications': 'Certifications',
    'section.projects': 'Projets',
    'section.contact': 'Contact',
    'contact.email': 'E-mail',
    'contact.location': 'Localisation',
    'contact.phone.za': 'Téléphone (ZA)',
    'contact.phone.eu': 'Téléphone (EU)',
    'blog.title': 'Blog',
    'blog.subtitle': "Articles sur l'ingénierie logicielle, l'architecture cloud et la technologie géospatiale.",
    'blog.readmore': 'Lire la suite →',
    'blog.back': '← Retour au Blog',
    'blog.published': 'Publié le',
    'footer.rights': 'Tous droits réservés.',
    'footer.imprint': 'Imprint',
    'footer.privacy': 'Privacy',
  },
} as const;

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui[typeof defaultLang]): string {
    return (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;
  };
}

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  if (first === 'de' || first === 'pt' || first === 'fr') return first;
  return defaultLang;
}

export function getLocalizedUrl(url: URL, targetLang: Lang): string {
  const currentLang = getLangFromUrl(url);
  let pathname = url.pathname;

  if (pathname !== '/' && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }

  let basePath = pathname;
  if (currentLang !== defaultLang) {
    basePath = pathname.slice(`/${currentLang}`.length) || '/';
  }

  if (targetLang === defaultLang) {
    return basePath || '/';
  }
  return basePath === '/' ? `/${targetLang}` : `/${targetLang}${basePath}`;
}
